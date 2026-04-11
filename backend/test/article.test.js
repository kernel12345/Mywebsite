const request = require('supertest');
const app = require('../app');
const Article = require('../models/Article');
const Category = require('../models/Category');
const sequelize = require('../config/db');

// 测试前的设置
beforeAll(async () => {
  // 同步数据库表
  await sequelize.sync({ force: true });
  // 创建测试分类
  await Category.create({
    name: 'Test Category',
    type: 'article'
  });
  // 创建测试文章
  await Article.create({
    title: 'Test Article',
    content: 'Test Content',
    excerpt: 'Test Excerpt',
    categoryId: 1,
    tags: 'test,article',
    status: 'published'
  });
});

// 测试后的清理
afterAll(async () => {
  // 关闭数据库连接
  await sequelize.close();
});

// 测试文章CRUD操作
describe('Article CRUD Operations', () => {
  test('should get all articles', async () => {
    const response = await request(app).get('/api/articles');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('total');
    expect(response.body).toHaveProperty('pages');
    expect(response.body).toHaveProperty('currentPage');
    expect(response.body).toHaveProperty('articles');
    expect(Array.isArray(response.body.articles)).toBe(true);
  });

  test('should get a single article', async () => {
    const response = await request(app).get('/api/articles/1');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body.title).toBe('Test Article');
  });

  test('should create a new article', async () => {
    const response = await request(app)
      .post('/api/articles')
      .send({
        title: 'New Article',
        content: 'New Content',
        excerpt: 'New Excerpt',
        categoryId: 1,
        tags: 'new,article',
        status: 'published'
      });
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.title).toBe('New Article');
  });

  test('should update an article', async () => {
    const response = await request(app)
      .put('/api/articles/1')
      .send({
        title: 'Updated Article',
        content: 'Updated Content'
      });
    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe('Updated Article');
  });

  test('should delete an article', async () => {
    const response = await request(app).delete('/api/articles/1');
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Article deleted');
  });
});
