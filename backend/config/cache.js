const { createClient } = require('redis');

// 创建Redis客户端
const redisClient = createClient({
  url: 'redis://localhost:6379'
});

// 处理连接错误
redisClient.on('error', (err) => {
  console.error('Redis connection error:', err);
});

// 连接到Redis
redisClient.connect().catch(console.error);

// 缓存设置函数
async function setCache(key, value, expiration = 3600) {
  try {
    await redisClient.set(key, JSON.stringify(value), {
      EX: expiration
    });
  } catch (error) {
    console.error('Error setting cache:', error);
  }
}

// 缓存获取函数
async function getCache(key) {
  try {
    const value = await redisClient.get(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error('Error getting cache:', error);
    return null;
  }
}

// 缓存删除函数
async function deleteCache(key) {
  try {
    await redisClient.del(key);
  } catch (error) {
    console.error('Error deleting cache:', error);
  }
}

// 缓存清除函数（用于特定前缀的键）
async function clearCacheByPrefix(prefix) {
  try {
    const keys = await redisClient.keys(`${prefix}*`);
    if (keys.length > 0) {
      await redisClient.del(keys);
    }
  } catch (error) {
    console.error('Error clearing cache by prefix:', error);
  }
}

module.exports = {
  setCache,
  getCache,
  deleteCache,
  clearCacheByPrefix
};