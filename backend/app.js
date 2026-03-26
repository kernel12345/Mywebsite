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

// 路由
app.get('/', (req, res) => {
  res.send('Backend server is running');
});

// 引入路由
const blogRoutes = require('./routes/blogRoutes');
const userRoutes = require('./routes/userRoutes');

// 使用路由
app.use('/api/blogs', blogRoutes);
app.use('/api/users', userRoutes);

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});