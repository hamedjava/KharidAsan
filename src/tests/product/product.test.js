/**
 * src/tests/product/product.test.js
 * 📦 تست کامل CRUD محصولات
 */
import request from 'supertest';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

// 📌 تبدیل مسیر نسبی به مسیر مطلق بر اساس محل تست
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import app from '../../app.js';
import Product from '../../modules/product/infrastructure/models/ProductModel.js';

// 🎯 آدرس دیتابیس تست (MongoDB)
const TEST_DB_URI = 'mongodb://localhost:27017/GreenShopTest';

// 💡 اتصال به دیتابیس تست قبل از همه تست‌ها
beforeAll(async () => {
  try {
    await mongoose.connect(TEST_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    await Product.deleteMany({});
  } catch (err) {
    console.error('❌ اتصال به دیتابیس تست با خطا مواجه شد:', err);
    throw err;
  }
});

// 🧹 پاک‌سازی داده‌ها بعد از هر تست
afterEach(async () => {
  try {
    await Product.deleteMany({});
  } catch (err) {
    console.error('❌ خطا در پاک‌سازی بعد از تست:', err);
    throw err;
  }
});

// 📤 بستن اتصال پس از پایان همه تست‌ها
afterAll(async () => {
  try {
    await Product.deleteMany({});
    await mongoose.connection.close();
  } catch (err) {
    console.error('❌ خطا در بستن اتصال به دیتابیس تست:', err);
    throw err;
  }
});

describe('📦 ماژول Product - تست کامل CRUD', () => {
  let productId;

  test('✅ ایجاد محصول جدید', async () => {
    const newProduct = {
      name: 'لباس زیر تستی',
      description: 'یک محصول تستی جذاب',
      price: 150000,
      category: 'لباس زیر زنانه',
      stock: 10
    };

    const res = await request(app).post('/api/products').send(newProduct);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.name).toBe(newProduct.name);

    // ذخیره جهت استفاده در تست‌های آتی
    productId = res.body._id;
  });

  test('📄 دریافت لیست محصولات', async () => {
    await Product.create({
      name: 'محصول شماره ۱',
      description: 'تست لیست محصول',
      price: 200000,
      category: 'اسپرت',
      stock: 5
    });

    const res = await request(app).get('/api/products');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });

  test('🔍 دریافت محصول با شناسه', async () => {
    const product = await Product.create({
      name: 'محصول با ID اختصاصی',
      description: 'تست گرفتن با ID',
      price: 100000,
      category: 'مناسبتی',
      stock: 7
    });

    const res = await request(app).get(`/api/products/${product._id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('_id', product._id.toString());
  });

  test('✏️ بروزرسانی محصول', async () => {
    const product = await Product.create({
      name: 'محصول قابل بروزرسانی',
      description: 'قبل از بروزرسانی',
      price: 120000,
      category: 'خانگی راحت',
      stock: 8
    });

    const res = await request(app)
      .put(`/api/products/${product._id}`)
      .send({ price: 250000 });

    expect(res.statusCode).toBe(200);
    expect(res.body.price).toBe(250000);
  });

  test('🗑 حذف محصول', async () => {
    const product = await Product.create({
      name: 'محصول قابل حذف',
      description: 'قرار است حذف شود',
      price: 300000,
      category: 'فانتزی',
      stock: 4
    });

    const res = await request(app).delete(`/api/products/${product._id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toMatch(/با موفقیت حذف شد/);
  });
});
