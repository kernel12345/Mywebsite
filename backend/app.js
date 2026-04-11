const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const sequelize = require('./config/db');

// 导入模型
const User = require('./models/User');
const Category = require('./models/Category');
const Product = require('./models/Product');
const Article = require('./models/Article');

const app = express();
const PORT = process.env.PORT || 3001;

// 安全中间件
app.use(helmet());

// 速率限制
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15分钟
  max: 100, // 每个IP限制100个请求
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// 中间件
app.use(cors());
app.use(express.json());

// 尝试连接到MySQL服务器并创建数据库
const mysql = require('mysql2/promise');

async function createDatabase() {
  try {
    // 先连接到MySQL服务器（不指定数据库）
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'admin'
    });
    
    // 创建blog数据库
    await connection.execute('CREATE DATABASE IF NOT EXISTS blog');
    await connection.end();
    console.log('Database blog created successfully');
  } catch (error) {
    console.error('Error creating database:', error);
  }
}

// 先创建数据库，然后同步表结构
createDatabase().then(() => {
  // 同步数据库表
  sequelize.sync({ force: false })
    .then(() => {
      console.log('Database tables synchronized');
      // 创建默认管理员账号
      createDefaultAdmin();
    })
    .catch(err => {
      console.error('Error synchronizing database tables:', err);
      console.log('Server will continue running, but database features will be unavailable');
    });
});

// 创建默认管理员账号
async function createDefaultAdmin() {
  try {
    const existingAdmin = await User.findOne({ where: { username: 'admin' } });
    if (!existingAdmin) {
      await User.create({
        username: 'admin',
        email: 'admin@example.com',
        password: 'admin123'
      });
      console.log('Default admin account created');
    }
  } catch (err) {
    console.error('Error creating default admin:', err);
  }
}

// 引入路由
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const articleRoutes = require('./routes/articleRoutes');

// 使用路由
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/articles', articleRoutes);

// 捕获所有请求，包括包含特殊字符的路径
app.use((req, res, next) => {
  // 检查请求路径是否是根路径
  if (req.path === '/') {
    return res.send('Backend server is running');
  }
  // 处理所有其他路径，包括包含特殊字符的路径
  res.status(404).json({ message: 'Route not found' });
});

// 错误处理中间件，捕获所有未处理的错误
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});