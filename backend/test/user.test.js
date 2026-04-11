const request = require('supertest');
const app = require('../app');
const User = require('../models/User');
const sequelize = require('../config/db');

// 测试前的设置
beforeAll(async () => {
  // 同步数据库表
  await sequelize.sync({ force: true });
  // 创建测试用户
  await User.create({
    username: 'testuser',
    email: 'test@example.com',
    password: 'password123'
  });
});

// 测试后的清理
afterAll(async () => {
  // 关闭数据库连接
  await sequelize.close();
});

// 测试用户登录
describe('User Authentication', () => {
  test('should login with valid credentials', async () => {
    const response = await request(app)
      .post('/api/users/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Login successful');
    expect(response.body.user).toHaveProperty('id');
    expect(response.body.user).toHaveProperty('username');
    expect(response.body.user).toHaveProperty('email');
  });

  test('should not login with invalid credentials', async () => {
    const response = await request(app)
      .post('/api/users/login')
      .send({
        email: 'test@example.com',
        password: 'wrongpassword'
      });
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe('Invalid email or password');
  });

  test('should not login with non-existent email', async () => {
    const response = await request(app)
      .post('/api/users/login')
      .send({
        email: 'nonexistent@example.com',
        password: 'password123'
      });
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe('Invalid email or password');
  });
});

// 测试用户注册
describe('User Registration', () => {
  test('should register a new user', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({
        username: 'newuser',
        email: 'newuser@example.com',
        password: 'password123'
      });
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.username).toBe('newuser');
    expect(response.body.email).toBe('newuser@example.com');
  });

  test('should not register with existing email', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({
        username: 'anotheruser',
        email: 'test@example.com',
        password: 'password123'
      });
    expect(response.statusCode).toBe(400);
  });
});
