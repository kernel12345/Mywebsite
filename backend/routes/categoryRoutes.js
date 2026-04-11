const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// 获取所有分类
router.get('/', async (req, res) => {
  try {
    const { type } = req.query;
    const where = type ? { type } : {};
    const categories = await Category.findAll({ where });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 获取单个分类
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 创建分类
router.post('/', async (req, res) => {
  const category = {
    name: req.body.name,
    type: req.body.type
  };

  try {
    const newCategory = await Category.create(category);
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 更新分类
router.put('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    await category.update({
      name: req.body.name || category.name,
      type: req.body.type || category.type
    });

    const updatedCategory = await Category.findByPk(req.params.id);
    res.json(updatedCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 删除分类
router.delete('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    await category.destroy();
    res.json({ message: 'Category deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 批量删除分类
router.delete('/', async (req, res) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids)) {
      return res.status(400).json({ message: 'Invalid request format' });
    }

    await Category.destroy({ where: { id: ids } });
    res.json({ message: 'Categories deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;