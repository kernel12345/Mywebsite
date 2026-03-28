const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

// 中间件
app.use(cors());
app.use(express.json());

// 连接数据库
mongoose.connect('mongodb://localhost:27017/blog')
.then(() => {
  console.log('MongoDB connected');
})
.catch(err => {
  console.error('MongoDB connection error:', err);
  console.log('Server will continue running without MongoDB');
});

// 引入路由
const blogRoutes = require('./routes/blogRoutes');
const userRoutes = require('./routes/userRoutes');

// 捕获所有请求，包括包含特殊字符的路径
app.use((req, res, next) => {
  // 检查请求路径是否是根路径
  if (req.path === '/') {
    return res.send('Backend server is running');
  }
  // 检查请求路径是否以 /api 开头
  if (req.path.startsWith('/api')) {
    return next();
  }
  // 处理所有其他路径，包括包含特殊字符的路径
  res.status(404).json({ message: 'Route not found' });
});

// 使用路由
app.use('/api/blogs', blogRoutes);
app.use('/api/users', userRoutes);

// 错误处理中间件，捕获所有未处理的错误
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});