const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User');

// 获取所有用户
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 获取单个用户
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 创建用户
router.post('/', 
  [
    body('username').trim().isLength({ min: 3, max: 50 }).escape(),
    body('email').trim().isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 })
  ],
  async (req, res) => {
    // 验证输入
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    };

    try {
      const newUser = await User.create(user);
      res.status(201).json(newUser);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
);

// 更新用户
router.put('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.update({
      username: req.body.username || user.username,
      email: req.body.email || user.email,
      password: req.body.password || user.password
    });

    const updatedUser = await User.findByPk(req.params.id);
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 删除用户
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.destroy();
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 登录路由
router.post('/login',
  [
    body('email').trim().notEmpty(),
    body('password').notEmpty()
  ],
  async (req, res) => {
    // 验证输入
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;
      
      // 查找用户（允许使用用户名或邮箱登录）
      let user;
      if (email.includes('@')) {
        // 邮箱登录
        user = await User.findOne({ where: { email } });
      } else {
        // 用户名登录
        user = await User.findOne({ where: { username: email } });
      }
      
      if (!user) {
        return res.status(401).json({ message: 'Invalid email/username or password' });
      }
      
      // 验证密码
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email/username or password' });
      }
      
      // 登录成功
      res.json({ 
        message: 'Login successful',
        user: {
          id: user.id,
          username: user.username,
          email: user.email
        }
      });
    } catch (err) {
      if (err.message.includes('timed out')) {
        res.status(503).json({ message: 'Database connection timeout' });
      } else {
        res.status(500).json({ message: err.message });
      }
    }
  }
);

module.exports = router;