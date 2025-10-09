const registerCustomer = require('../../domain/usecases/registerCustomer.usecase');
const loginWithOtp = require('../../domain/usecases/loginWithOTP.usecase');
const jwt = require('jsonwebtoken');
const customerRepository = require('../../infrastructure/repositories/customer.repository');

module.exports = {
  async register(req, res) {
    try {
      const result = await registerCustomer(req.body);
      res.status(201).json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async sendOtp(req, res) {
    try {
      const result = await loginWithOtp(req.body.mobile);
      res.json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async verifyOtp(req, res) {
    try {
      const { mobile, otp } = req.body;
      const customer = await customerRepository.findByMobile(mobile);
      if (!customer || customer.otp.code !== otp) throw new Error('Invalid OTP');
      if (new Date() > new Date(customer.otp.expiresAt)) throw new Error('OTP expired');

      const token = jwt.sign({ id: customer.id, role: 'customer' }, process.env.JWT_SECRET, { expiresIn: '2h' });
      await customerRepository.updateById(customer.id, { otp: null });

      res.json({ token });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
};
