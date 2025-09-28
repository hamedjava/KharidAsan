import { jest } from '@jest/globals';
import request from 'supertest';
import app from '../../../app.js';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import Admin from '../../../modules/users/admin/infrastructure/models/AdminModel.js';

// ✨ ست کردن JWT_SECRET پیش‌فرض برای محیط تست
process.env.JWT_SECRET = process.env.JWT_SECRET || 'test_secret';

jest.setTimeout(30000); // افزایش زمان برای اتصال به DB

describe('🛡 تست سطح دسترسی ادمین', () => {
  let superAdminToken, managerToken;

  beforeAll(async () => {
    // اتصال به دیتابیس تست
    await mongoose.connect(process.env.MONGO_URL_TEST || 'mongodb://127.0.0.1:27017/greenshop_test');
    await Admin.deleteMany({});

    // ➕ ایجاد سوپرادمین
    const superAdmin = await Admin.create({
      username: 'superadmin',
      fullName: 'سوپر ادمین',
      email: 'super@admin.com',
      password: '123456', // فرض می‌کنیم bcrypt در pre-save این رو هش می‌کنه
      mobile: '+989111111111',
      role: 'super_admin'
    });

    // ➕ ایجاد مدیر معمولی
    const manager = await Admin.create({
      username: 'manager',
      fullName: 'مدیر عادی',
      email: 'manager@admin.com',
      password: '123456',
      mobile: '+989222222222',
      role: 'manager'
    });

    // 🎯 ساخت مستقیم توکن با کلید تستی هماهنگ با middleware
    superAdminToken = jwt.sign(
      { id: superAdmin._id, role: superAdmin.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    managerToken = jwt.sign(
      { id: manager._id, role: manager.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
  });

  afterAll(async () => {
    await mongoose.connection.close(); // بستن اتصال بعد از تست‌ها
  });

  test('✅ دسترسی مجاز برای سوپر ادمین', async () => {
    const res = await request(app)
      .get('/api/admins/secure-data')
      .set('Authorization', `Bearer ${superAdminToken}`);

    expect(res.status).toBe(200);
  });

  test('❌ دسترسی غیرمجاز برای مدیر معمولی', async () => {
    const res = await request(app)
      .get('/api/admins/secure-data')
      .set('Authorization', `Bearer ${managerToken}`);

    expect(res.status).toBe(403);
  });
});
