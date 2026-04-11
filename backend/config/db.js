const { Sequelize } = require('sequelize');

// 创建Sequelize实例
const sequelize = new Sequelize('blog', 'root', 'admin', {
  host: 'localhost',
  dialect: 'mysql',
  logging: console.log
});

// 测试数据库连接
sequelize.authenticate()
  .then(() => {
    console.log('MySQL connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;