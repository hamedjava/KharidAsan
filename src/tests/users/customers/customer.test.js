// 🛠 باید قبل از import کردن app ست بشه
process.env.JWT_SECRET = 'test_secret';

import request from 'supertest';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import app from '../../../app.js';
import Customer from '../../../modules/users/customer/infrastructure/models/CustomerModel.js';

const TEST_DB_URI = 'mongodb://localhost:27017/GreenShopCustomerTest';

beforeAll(async () => {
  await mongoose.connect(TEST_DB_URI);
  await Customer.deleteMany({});
});

afterEach(async () => {
  await Customer.deleteMany({});
});

afterAll(async () => {
  await Customer.deleteMany({});
  await mongoose.connection.close();
});

describe('👤 ماژول Customer - تست CRUD', () => {
  test('✅ ایجاد مشتری', async () => {
    const res = await request(app).post('/api/customers').send({
      username: 'custuser1',
      fullName: 'مشتری تستی',
      email: 'cust@test.com',
      password: '123456',
      mobile: '+989123456000'
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.email).toBe('cust@test.com');
    expect(res.body.mobile).toBe('+989123456000');
  });
});

describe('🔐 ماژول Customer - تست ارسال OTP (sendOtp)', () => {
  const mobile = '+989555555000';

  beforeEach(async () => {
    await Customer.deleteMany({});
  });

  test('✅ ارسال موفق OTP برای موبایل موجود', async () => {
    await Customer.create({
      username: 'custotp',
      fullName: 'مشتری OTP',
      email: 'otpuser@cust.com',
      password: 'pass',
      mobile
    });

    const response = await request(app)
      .post('/api/customers/send-otp')
      .send({ mobile });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toMatch(/کد OTP ارسال شد/);

    const customerRecord = await Customer.findOne({ mobile });
    expect(customerRecord).toBeTruthy();
    expect(customerRecord.otpCode).toBeDefined();
    expect(typeof customerRecord.otpCode).toBe('string');
    expect(customerRecord.otpCode.length).toBeGreaterThan(3);
  });

  test('❌ ارسال OTP برای موبایل ثبت نشده باید خطا بدهد', async () => {
    const response = await request(app)
      .post('/api/customers/send-otp')
      .send({ mobile: '+989000000000' });

    expect(response.statusCode).toBe(404);
    expect(response.body.error).toMatch(/یافت نشد/);
  });
});

describe('🔑 ماژول Customer - تست ورود با ایمیل و پسورد (loginWithEmail)', () => {
  const email = 'custlogin@test.com';
  const plainPassword = 'secret123';

  beforeEach(async () => {
    await Customer.deleteMany({});
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    await Customer.create({
      username: 'custlogin',
      fullName: 'مشتری لاگین',
      email,
      password: hashedPassword,
      mobile: '+989777777000'
    });
  });

  test('✅ ورود موفق با ایمیل و پسورد درست', async () => {
    const response = await request(app)
      .post('/api/customers/login-email')
      .send({ email, password: plainPassword });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toMatch(/ورود موفق/);
    expect(response.body).toHaveProperty('token');
    expect(response.body.customer.email).toBe(email);
  });

  test('❌ خطای ورود با ایمیل درست و پسورد اشتباه', async () => {
    const response = await request(app)
      .post('/api/customers/login-email')
      .send({ email, password: 'wrongpass' });

    expect(response.statusCode).toBe(401);
    expect(response.body.error).toMatch(/رمز عبور اشتباه/);
  });

  test('❌ خطای ورود با ایمیل اشتباه', async () => {
    const response = await request(app)
      .post('/api/customers/login-email')
      .send({ email: 'nonexistent@test.com', password: plainPassword });

    expect(response.statusCode).toBe(404);
    expect(response.body.error).toMatch(/یافت نشد/);
  });

  test('❌ خطای ورود بدون ارسال ایمیل یا پسورد', async () => {
    const response = await request(app)
      .post('/api/customers/login-email')
      .send({});

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toMatch(/ایمیل و رمز عبور الزامی است/);
  });
});
