const request = require('supertest');
const app = require('../app');
const Product = require('../models/Product');
const Category = require('../models/Category');
const sequelize = require('../config/db');

// 测试前的设置
beforeAll(async () => {
  // 同步数据库表
  await sequelize.sync({ force: true });
  // 创建测试分类
  await Category.create({
    name: 'Test Category',
    type: 'product'
  });
  // 创建测试商品
  await Product.create({
    name: 'Test Product',
    description: 'Test Description',
    price: 100.00,
    stock: 10,
    categoryId: 1,
    status: 'published'
  });
});

// 测试后的清理
afterAll(async () => {
  // 关闭数据库连接
  await sequelize.close();
});

// 测试商品CRUD操作
describe('Product CRUD Operations', () => {
  test('should get all products', async () => {
    const response = await request(app).get('/api/products');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('total');
    expect(response.body).toHaveProperty('pages');
    expect(response.body).toHaveProperty('currentPage');
    expect(response.body).toHaveProperty('products');
    expect(Array.isArray(response.body.products)).toBe(true);
  });

  test('should get a single product', async () => {
    const response = await request(app).get('/api/products/1');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('Test Product');
  });

  test('should create a new product', async () => {
    const response = await request(app)
      .post('/api/products')
      .send({
        name: 'New Product',
        description: 'New Description',
        price: 200.00,
        stock: 20,
        categoryId: 1,
        status: 'published'
      });
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('New Product');
  });

  test('should update a product', async () => {
    const response = await request(app)
      .put('/api/products/1')
      .send({
        name: 'Updated Product',
        price: 150.00
      });
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe('Updated Product');
    expect(response.body.price).toBe('150.00');
  });

  test('should delete a product', async () => {
    const response = await request(app).delete('/api/products/1');
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Product deleted');
  });
});
