const request = require('supertest');
const app = require('../../../app');

describe('آزمون API مشتریان', () => {
  it('باید لیست مشتریان را برگرداند', async () => {
    const res = await request(app).get('/api/customers');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
