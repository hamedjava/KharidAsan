// مسیر فایل: seller/tests/seller.test.js
// شرح وظایف: این فایل تست‌های واحد (Unit Test) و یکپارچه (Integration Test) ماژول Seller را اجرا می‌کند.
// تست‌ها شامل عملیات CRUD، ارسال OTP و ورود با ایمیل و رمز عبور هستند.
// برای اجرای این تست نیاز به MongoDB لوکال و مقداردهی JWT_SECRET دارید.

// 🛠 باید قبل از import کردن app ست بشه
process.env.JWT_SECRET = 'test_secret';

import request from 'supertest';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import app from '../../../app.js';
import Seller from '../../../modules/users/seller/infrastructure/models/SellerModel.js';

const TEST_DB_URI = 'mongodb://localhost:27017/GreenShopTest';

beforeAll(async () => {
  await mongoose.connect(TEST_DB_URI);
  await Seller.deleteMany({});
});

afterEach(async () => {
  await Seller.deleteMany({});
});

afterAll(async () => {
  await Seller.deleteMany({});
  await mongoose.connection.close();
});


// 👨‍💼 ماژول Seller - تست CRUD
describe('👨‍💼 ماژول Seller - تست CRUD', () => {
  test('✅ ایجاد فروشنده', async () => {
    const res = await request(app).post('/api/sellers').send({
      username: 'selleruser1',
      fullName: 'فروشنده تستی',
      email: 'seller@test.com',
      password: '123456',
      mobile: '+989123456789'
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.email).toBe('seller@test.com');
    expect(res.body.mobile).toBe('+989123456789');
  });
});


// 🔐 ماژول Seller - تست ارسال OTP (sendOtp)
describe('🔐 ماژول Seller - تست ارسال OTP (sendOtp)', () => {
  const mobile = '+989555555555';

  beforeEach(async () => {
    await Seller.deleteMany({});
  });

  test('✅ ارسال موفق OTP برای موبایل موجود', async () => {
    await Seller.create({
      username: 'sellerotp', // ✅ اضافه شد
      fullName: 'فروشنده OTP',
      email: 'otpuser@test.com',
      password: 'pass',
      mobile
    });

    const response = await request(app)
      .post('/api/sellers/send-otp')
      .send({ mobile });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toMatch(/کد OTP ارسال شد/);

    const sellerRecord = await Seller.findOne({ mobile });
    expect(sellerRecord).toBeTruthy();
    expect(sellerRecord.otpCode).toBeDefined();
    expect(typeof sellerRecord.otpCode).toBe('string');
    expect(sellerRecord.otpCode.length).toBeGreaterThan(3);
  });

  test('❌ ارسال OTP برای موبایل ثبت نشده باید خطا بدهد', async () => {
    const response = await request(app)
      .post('/api/sellers/send-otp')
      .send({ mobile: '+989000000000' });

    expect(response.statusCode).toBe(404);
    expect(response.body.error).toMatch(/یافت نشد/);
  });
});


// 🔑 ماژول Seller - تست ورود با ایمیل و پسورد (loginWithEmail)
describe('🔑 ماژول Seller - تست ورود با ایمیل و پسورد (loginWithEmail)', () => {
  const email = 'sellerlogin@test.com';
  const plainPassword = 'secret123';

  beforeEach(async () => {
    await Seller.deleteMany({});
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    await Seller.create({
      username: 'sellerlogin', // ✅ اضافه شد
      fullName: 'فروشنده لاگین',
      email,
      password: hashedPassword,
      mobile: '+989777777777'
    });
  });

  test('✅ ورود موفق با ایمیل و پسورد درست', async () => {
    const response = await request(app)
      .post('/api/sellers/login-email')
      .send({ email, password: plainPassword });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toMatch(/ورود موفق/);
    expect(response.body).toHaveProperty('token');
    expect(response.body.seller.email).toBe(email);
  });

  test('❌ خطای ورود با ایمیل درست و پسورد اشتباه', async () => {
    const response = await request(app)
      .post('/api/sellers/login-email')
      .send({ email, password: 'wrongpass' });

    expect(response.statusCode).toBe(401);
    expect(response.body.error).toMatch(/رمز عبور اشتباه/);
  });

  test('❌ خطای ورود با ایمیل اشتباه', async () => {
    const response = await request(app)
      .post('/api/sellers/login-email')
      .send({ email: 'nonexistent@test.com', password: plainPassword });

    expect(response.statusCode).toBe(404);
    expect(response.body.error).toMatch(/یافت نشد/);
  });

  test('❌ خطای ورود بدون ارسال ایمیل یا پسورد', async () => {
    const response = await request(app)
      .post('/api/sellers/login-email')
      .send({});

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toMatch(/ایمیل و رمز عبور الزامی است/);
  });
});
