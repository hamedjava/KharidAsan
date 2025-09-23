// ===============================
// 📂 تست خودکار ماژول Product
// ابزارها: Jest + Supertest
// ===============================

import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app.js'; // استفاده از اپ اصلی

let createdProductId;

beforeAll(async () => {
  // اتصال به MongoDB قبل از شروع تست‌ها
  const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/pink-store';
  await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  // پاک کردن دیتابیس و بستن اتصال
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
});

describe('🧪 Product Module Tests', () => {
  
  // 1️⃣ ایجاد محصول جدید
  test('POST /api/products → ایجاد محصول جدید', async () => {
    const res = await request(app)
      .post('/api/products')
      .send({
        name: 'Laptop Lenovo',
        description: 'ThinkPad X1 Carbon',
        price: 43000000,
        category: 'Laptop',
        stock: 5,
        images: ['https://example.com/image1.jpg']
      });
    
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    createdProductId = res.body._id;
  });

  // 2️⃣ دریافت محصول با ID
  test('GET /api/products/:id → دریافت محصول', async () => {
    const res = await request(app)
      .get(`/api/products/${createdProductId}`);
    
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Laptop Lenovo');
  });

  // 3️⃣ ویرایش محصول
  test('PUT /api/products/:id → ویرایش محصول', async () => {
    const res = await request(app)
      .put(`/api/products/${createdProductId}`)
      .send({ price: 41000000, stock: 10 });
    
    expect(res.statusCode).toBe(200);
    expect(res.body.price).toBe(41000000);
    expect(res.body.stock).toBe(10);
  });

  // 4️⃣ لیست همه محصولات
  test('GET /api/products → لیست محصولات', async () => {
    const res = await request(app)
      .get('/api/products');
    
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // 5️⃣ جستجو بر اساس نام
  test('GET /api/products/search?q=Laptop → جستجو', async () => {
    const res = await request(app)
      .get('/api/products/search?q=Laptop');
    
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0].name).toContain('Laptop');
  });

  // 6️⃣ مرتب‌سازی بر اساس قیمت صعودی
  test('GET /api/products/order-by-price?order=asc → مرتب‌سازی صعودی', async () => {
    const res = await request(app)
      .get('/api/products/order-by-price?order=asc');
    
    expect(res.statusCode).toBe(200);
    const prices = res.body.map(p => p.price);
    const sorted = [...prices].sort((a,b) => a - b);
    expect(prices).toEqual(sorted);
  });

  // 7️⃣ حذف محصول
  test('DELETE /api/products/:id → حذف محصول', async () => {
    const res = await request(app)
      .delete(`/api/products/${createdProductId}`);
    
    expect(res.statusCode).toBe(204);
  });

  // 8️⃣ دریافت محصول حذف‌شده (باید 404 باشد)
  test('GET /api/products/:id → محصول حذف شده', async () => {
    const res = await request(app)
      .get(`/api/products/${createdProductId}`);
    
    expect(res.statusCode).toBe(404);
  });

});
