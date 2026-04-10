const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

// 获取所有博客
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 获取单个博客
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
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
  const blog = new Blog({
    title: req.body.title,
    content: req.body.content || '',
    excerpt: req.body.excerpt,
    category: req.body.category,
    date: req.body.date,
    status: req.body.status || 'draft',
    tags: req.body.tags || [],
    author: req.body.author
  });

  try {
    const newBlog = await blog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 更新博客
router.put('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    blog.title = req.body.title || blog.title;
    blog.content = req.body.content || blog.content;
    blog.excerpt = req.body.excerpt || blog.excerpt;
    blog.category = req.body.category || blog.category;
    blog.date = req.body.date || blog.date;
    blog.status = req.body.status || blog.status;
    blog.tags = req.body.tags || blog.tags;

    const updatedBlog = await blog.save();
    res.json(updatedBlog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 删除博客
router.delete('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    await blog.remove();
    res.json({ message: 'Blog deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;