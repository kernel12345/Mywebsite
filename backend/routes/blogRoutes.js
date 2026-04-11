const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

// 获取所有博客
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.findAll();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 获取单个博客
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 创建博客
router.post('/', async (req, res) => {
  const blog = {
    title: req.body.title,
    content: req.body.content,
    excerpt: req.body.excerpt,
    date: req.body.date || new Date(),
    category: req.body.category,
    tags: req.body.tags,
    status: req.body.status || 'published'
  };

  try {
    const newBlog = await Blog.create(blog);
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 更新博客
router.put('/:id', async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    await blog.update({
      title: req.body.title || blog.title,
      content: req.body.content || blog.content,
      excerpt: req.body.excerpt || blog.excerpt,
      date: req.body.date || blog.date,
      category: req.body.category || blog.category,
      tags: req.body.tags || blog.tags,
      status: req.body.status || blog.status
    });

    const updatedBlog = await Blog.findByPk(req.params.id);
    res.json(updatedBlog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 删除博客
router.delete('/:id', async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    await blog.destroy();
    res.json({ message: 'Blog deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;