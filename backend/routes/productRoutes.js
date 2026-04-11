const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { Op } = require('sequelize');
const Product = require('../models/Product');
const Category = require('../models/Category');
const { setCache, getCache, clearCacheByPrefix } = require('../config/cache');

// 获取所有商品
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, categoryId, status, search } = req.query;
    
    // 生成缓存键
    const cacheKey = `products:${page}:${limit}:${categoryId || 'all'}:${status || 'all'}:${search || 'none'}`;
    
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
      where.name = { [Op.like]: `%${search}%` };
    }

    const { count, rows } = await Product.findAndCountAll({
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
      products: rows
    };
    
    // 将结果存入缓存
    await setCache(cacheKey, responseData, 300); // 缓存5分钟
    
    res.json(responseData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 获取单个商品
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [{ model: Category }]
    });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 创建商品
router.post('/',
  [
    body('name').trim().isLength({ min: 1, max: 255 }).escape(),
    body('description').trim().escape(),
    body('price').isNumeric().isFloat({ min: 0 }),
    body('stock').isInt({ min: 0 }),
    body('categoryId').optional().isInt(),
    body('image').trim().optional(),
    body('status').isIn(['published', 'draft', 'archived'])
  ],
  async (req, res) => {
    // 验证输入
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const product = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock,
      categoryId: req.body.categoryId,
      image: req.body.image,
      status: req.body.status
    };

    try {
      const newProduct = await Product.create(product);
      // 清除商品相关的缓存
      await clearCacheByPrefix('products:');
      res.status(201).json(newProduct);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
);

// 更新商品
router.put('/:id',
  [
    body('name').trim().optional().isLength({ min: 1, max: 255 }).escape(),
    body('description').trim().optional().escape(),
    body('price').optional().isNumeric().isFloat({ min: 0 }),
    body('stock').optional().isInt({ min: 0 }),
    body('categoryId').optional().isInt(),
    body('image').trim().optional(),
    body('status').optional().isIn(['published', 'draft', 'archived'])
  ],
  async (req, res) => {
    // 验证输入
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const product = await Product.findByPk(req.params.id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      await product.update({
        name: req.body.name || product.name,
        description: req.body.description || product.description,
        price: req.body.price || product.price,
        stock: req.body.stock || product.stock,
        categoryId: req.body.categoryId || product.categoryId,
        image: req.body.image || product.image,
        status: req.body.status || product.status
      });

      const updatedProduct = await Product.findByPk(req.params.id, {
        include: [{ model: Category }]
      });
      
      // 清除商品相关的缓存
      await clearCacheByPrefix('products:');
      
      res.json(updatedProduct);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
);

// 删除商品
router.delete('/:id', async (req, res) => {
  try {
      const product = await Product.findByPk(req.params.id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      await product.destroy();
      
      // 清除商品相关的缓存
      await clearCacheByPrefix('products:');
      
      res.json({ message: 'Product deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

// 批量删除商品
router.delete('/', async (req, res) => {
  try {
      const { ids } = req.body;
      if (!Array.isArray(ids)) {
        return res.status(400).json({ message: 'Invalid request format' });
      }

      await Product.destroy({ where: { id: ids } });
      
      // 清除商品相关的缓存
      await clearCacheByPrefix('products:');
      
      res.json({ message: 'Products deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

// 批量更新商品状态
router.put('/batch/status', async (req, res) => {
  try {
      const { ids, status } = req.body;
      if (!Array.isArray(ids) || !status) {
        return res.status(400).json({ message: 'Invalid request format' });
      }

      await Product.update({ status }, { where: { id: ids } });
      
      // 清除商品相关的缓存
      await clearCacheByPrefix('products:');
      
      res.json({ message: 'Products status updated' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

module.exports = router;