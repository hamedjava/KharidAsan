// 🛠 باید قبل از import کردن app ست بشه
process.env.JWT_SECRET = 'test_secret';

import request from 'supertest';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import app from '../../../app.js';
import Admin from '../../../modules/users/admin/infrastructure/models/AdminModel.js';

const TEST_DB_URI = 'mongodb://localhost:27017/GreenShopTest';

beforeAll(async () => {
  await mongoose.connect(TEST_DB_URI);
  await Admin.deleteMany({});
});

afterEach(async () => {
  await Admin.deleteMany({});
});

afterAll(async () => {
  await Admin.deleteMany({});
  await mongoose.connection.close();
});

describe('👑 ماژول Admin - تست CRUD', () => {
  test('✅ ایجاد ادمین', async () => {
    const res = await request(app).post('/api/admins').send({
      username: 'adminuser1',
      fullName: 'مدیر تستی',
      email: 'admin@test.com',
      password: '123456',
      mobile: '+989123456789'
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.email).toBe('admin@test.com');
    expect(res.body.mobile).toBe('+989123456789');
  });
});

describe('🔐 ماژول Admin - تست ارسال OTP (sendOtp)', () => {
  const mobile = '+989555555555';

  beforeEach(async () => {
    await Admin.deleteMany({});
  });

  test('✅ ارسال موفق OTP برای موبایل موجود', async () => {
    await Admin.create({
      username: 'adminotp',
      fullName: 'مدیر OTP',
      email: 'otpuser@test.com',
      password: 'pass',
      mobile
    });

    const response = await request(app)
      .post('/api/admins/send-otp')
      .send({ mobile });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toMatch(/کد OTP ارسال شد/);

    const adminRecord = await Admin.findOne({ mobile });
    expect(adminRecord).toBeTruthy();
    expect(adminRecord.otpCode).toBeDefined();
    expect(typeof adminRecord.otpCode).toBe('string');
    expect(adminRecord.otpCode.length).toBeGreaterThan(3);
  });

  test('❌ ارسال OTP برای موبایل ثبت نشده باید خطا بدهد', async () => {
    const response = await request(app)
      .post('/api/admins/send-otp')
      .send({ mobile: '+989000000000' });

    expect(response.statusCode).toBe(404);
    expect(response.body.error).toMatch(/یافت نشد/);
  });
});

describe('🔑 ماژول Admin - تست ورود با ایمیل و پسورد (loginWithEmail)', () => {
  const email = 'adminlogin@test.com';
  const plainPassword = 'secret123';

  beforeEach(async () => {
    await Admin.deleteMany({});
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    await Admin.create({
      username: 'adminlogin',
      fullName: 'مدیر لاگین',
      email,
      password: hashedPassword,
      mobile: '+989777777777'
    });
  });

  test('✅ ورود موفق با ایمیل و پسورد درست', async () => {
    const response = await request(app)
      .post('/api/admins/login-email')
      .send({ email, password: plainPassword });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toMatch(/ورود موفق/);
    expect(response.body).toHaveProperty('token');
    expect(response.body.admin.email).toBe(email);
  });

  test('❌ خطای ورود با ایمیل درست و پسورد اشتباه', async () => {
    const response = await request(app)
      .post('/api/admins/login-email')
      .send({ email, password: 'wrongpass' });

    expect(response.statusCode).toBe(401);
    expect(response.body.error).toMatch(/رمز عبور اشتباه/);
  });

  test('❌ خطای ورود با ایمیل اشتباه', async () => {
    const response = await request(app)
      .post('/api/admins/login-email')
      .send({ email: 'nonexistent@test.com', password: plainPassword });

    expect(response.statusCode).toBe(404);
    expect(response.body.error).toMatch(/یافت نشد/);
  });

  test('❌ خطای ورود بدون ارسال ایمیل یا پسورد', async () => {
    const response = await request(app)
      .post('/api/admins/login-email')
      .send({});

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toMatch(/ایمیل و رمز عبور الزامی است/);
  });
});
