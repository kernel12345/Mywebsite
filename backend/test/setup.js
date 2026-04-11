// 测试设置文件
const sequelize = require('../config/db');

// 确保数据库连接在测试前关闭，避免连接冲突
beforeAll(async () => {
  try {
    // 断开可能存在的连接
    if (sequelize.connectionManager && sequelize.connectionManager.getConnection()) {
      await sequelize.close();
    }
  } catch (error) {
    console.error('Error closing existing connection:', error);
  }
});
