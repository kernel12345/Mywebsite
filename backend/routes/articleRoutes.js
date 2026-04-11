const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { Op } = require('sequelize');
const Article = require('../models/Article');
const Category = require('../models/Category');
const { setCache, getCache, clearCacheByPrefix } = require('../config/cache');

// 获取所有文章
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, categoryId, status, search } = req.query;
    
    // 生成缓存键
    const cacheKey = `articles:${page}:${limit}:${categoryId || 'all'}:${status || 'all'}:${search || 'none'}`;
    
    // 尝试从缓存中获取数据
    const cachedData = await getCache(cacheKey);
    if (cachedData) {
      return res.json(cachedData);
    }
    
    const offset = (page - 1) * limit;
    const where = {};

    if (categoryId) {
      where.categoryId = categoryId;
    }

    if (status) {
      where.status = status;
    }

    if (search) {
      where.title = { [Op.like]: `%${search}%` };
    }

    const { count, rows } = await Article.findAndCountAll({
      where,
      include: [{ model: Category }],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']]
    });

    const responseData = {
      total: count,
      pages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      articles: rows
    };
    
    // 将结果存入缓存
    await setCache(cacheKey, responseData, 300); // 缓存5分钟
    
    res.json(responseData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 获取单个文章
router.get('/:id', async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id, {
      include: [{ model: Category }]
    });
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.json(article);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 创建文章
router.post('/',
  [
    body('title').trim().isLength({ min: 1, max: 255 }).escape(),
    body('content').trim().escape(),
    body('excerpt').trim().optional().escape(),
    body('categoryId').optional().isInt().toInt(),
    body('tags').optional(),
    body('status').isIn(['published', 'draft', 'archived'])
  ],
  async (req, res) => {
    console.log('Received create article request:', req.body);
    
    // 验证输入
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const article = {
      title: req.body.title,
      content: req.body.content,
      excerpt: req.body.excerpt,
      categoryId: req.body.categoryId,
      tags: req.body.tags,
      status: req.body.status
    };

    try {
      console.log('Creating article with data:', article);
      const newArticle = await Article.create(article);
      console.log('Article created successfully:', newArticle);
      // 清除文章相关的缓存
      await clearCacheByPrefix('articles:');
      await clearCacheByPrefix('hot-tags');
      res.status(201).json(newArticle);
    } catch (err) {
      console.error('Error creating article:', err);
      res.status(400).json({ message: err.message, stack: err.stack });
    }
  }
);

// 更新文章
router.put('/:id',
  [
    body('title').trim().optional().isLength({ min: 1, max: 255 }).escape(),
    body('content').trim().optional().escape(),
    body('excerpt').trim().optional().escape(),
    body('categoryId').optional().isInt(),
    body('tags').optional(),
    body('status').optional().isIn(['published', 'draft', 'archived'])
  ],
  async (req, res) => {
    // 验证输入
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const article = await Article.findByPk(req.params.id);
      if (!article) {
        return res.status(404).json({ message: 'Article not found' });
      }

      await article.update({
        title: req.body.title || article.title,
        content: req.body.content || article.content,
        excerpt: req.body.excerpt || article.excerpt,
        categoryId: req.body.categoryId || article.categoryId,
        tags: req.body.tags || article.tags,
        status: req.body.status || article.status
      });

      const updatedArticle = await Article.findByPk(req.params.id, {
        include: [{ model: Category }]
      });
      
      // 清除文章相关的缓存
      await clearCacheByPrefix('articles:');
      await clearCacheByPrefix('hot-tags');
      
      res.json(updatedArticle);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
);

// 删除文章
router.delete('/:id', async (req, res) => {
  try {
      const article = await Article.findByPk(req.params.id);
      if (!article) {
        return res.status(404).json({ message: 'Article not found' });
      }

      await article.destroy();
      
      // 清除文章相关的缓存
      await clearCacheByPrefix('articles:');
      await clearCacheByPrefix('hot-tags');
      
      res.json({ message: 'Article deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

// 批量删除文章
router.delete('/', async (req, res) => {
  try {
      const { ids } = req.body;
      if (!Array.isArray(ids)) {
        return res.status(400).json({ message: 'Invalid request format' });
      }

      await Article.destroy({ where: { id: ids } });
      
      // 清除文章相关的缓存
      await clearCacheByPrefix('articles:');
      await clearCacheByPrefix('hot-tags');
      
      res.json({ message: 'Articles deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

// 批量更新文章状态
router.put('/batch/status', async (req, res) => {
  try {
      const { ids, status } = req.body;
      if (!Array.isArray(ids) || !status) {
        return res.status(400).json({ message: 'Invalid request format' });
      }

      await Article.update({ status }, { where: { id: ids } });
      
      // 清除文章相关的缓存
      await clearCacheByPrefix('articles:');
      await clearCacheByPrefix('hot-tags');
      
      res.json({ message: 'Articles status updated' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

// 导入文章数据
router.post('/import', async (req, res) => {
  try {
    const { articles } = req.body;
    if (!Array.isArray(articles)) {
      return res.status(400).json({ message: 'Invalid data format' });
    }
    
    const importedArticles = await Article.bulkCreate(articles);
    res.status(201).json({ message: 'Articles imported successfully', count: importedArticles.length });
  } catch (error) {
    console.error('Import articles error:', error);
    res.status(500).json({ message: 'Import failed' });
  }
});

// 导出文章数据
router.get('/export', async (req, res) => {
  try {
    const articles = await Article.findAll({
      include: [{ model: Category, as: 'Category' }]
    });
    
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', 'attachment; filename=articles.json');
    res.json(articles);
  } catch (error) {
    console.error('Export articles error:', error);
    res.status(500).json({ message: 'Export failed' });
  }
});

// 获取热门标签
router.get('/stats/hot-tags', async (req, res) => {
  try {
    // 生成缓存键
    const cacheKey = 'hot-tags';
    
    // 尝试从缓存中获取数据
    const cachedData = await getCache(cacheKey);
    if (cachedData) {
      return res.json(cachedData);
    }
    
    // 获取所有已发布的文章
    const articles = await Article.findAll({
      where: { status: 'published' }
    });
    
    // 统计标签出现次数
    const tagCounts = {};
    articles.forEach(article => {
      if (article.tags) {
        // 假设标签是以逗号分隔的字符串
        const tags = article.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
        tags.forEach(tag => {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
      }
    });
    
    // 转换为数组并按出现次数排序
    const hotTags = Object.entries(tagCounts)
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10); // 只返回前10个热门标签
    
    // 将结果存入缓存
    await setCache(cacheKey, hotTags, 300); // 缓存5分钟
    
    res.json(hotTags);
  } catch (error) {
    console.error('Get hot tags error:', error);
    res.status(500).json({ message: 'Failed to get hot tags' });
  }
});

module.exports = router;