const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../../../../app'); // مسیر درست به app.js

let mongoServer;
let token = '';

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
  process.env.NODE_ENV = 'test';
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Admin Module Full Flow', () => {
  const adminData = {
    email: 'adminone@example.com',
    password: '112233',
    mobile: '09120000000',
    otp: ''
  };

  test('Step 1: Register Admin', async () => {
    const res = await request(app)
      .post('/api/admin/register')
      .send({
        email: adminData.email,
        password: adminData.password,
        mobile: adminData.mobile
      })
      .expect(201);

    console.log('Register response:', res.body);

    expect(res.body.admin).toHaveProperty('_id');
    expect(res.body.admin.email).toBe(adminData.email);
  });

  test('Step 2: Send OTP', async () => {
    const res = await request(app)
      .post('/api/admin/send-otp')
      .send({ mobile: adminData.mobile })
      .expect(200);

    console.log('Send OTP response:', res.body);

    // گرفتن OTP واقعی از پاسخ API
    adminData.otp = res.body.otp;
    expect(adminData.otp).toBeDefined();
  });

  test('Step 3: Verify OTP', async () => {
    const res = await request(app)
      .post('/api/admin/verify-otp')
      .send({ mobile: adminData.mobile, otp: adminData.otp })
      .expect(200);

    console.log('Verify OTP response:', res.body);

    expect(res.body).toHaveProperty('token');
    token = res.body.token;
    expect(token).toBeDefined();
  });

  test('Step 4: Get Admin Profile', async () => {
    const res = await request(app)
      .get('/api/admin/profile')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    console.log('Profile response:', res.body);

    expect(res.body).toHaveProperty('email', adminData.email);
  });
});
