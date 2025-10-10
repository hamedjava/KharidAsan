const registerCustomer = require('../../domain/usecases/registerCustomer.usecase');
const loginWithOtp = require('../../domain/usecases/loginWithOTP.usecase');

module.exports = {
  async register(req, res) {
    try {
      const result = await registerCustomer(req.body);
      res.status(201).json({ message: 'Customer registered', data: result });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async sendOtp(req, res) {
    try {
      const { mobile } = req.body;
      const result = await loginWithOtp.sendOTP(mobile);
      res.json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async verifyOtp(req, res) {
    try {
      const { mobile, otp } = req.body;
      const result = await loginWithOtp.verifyOTP(mobile, otp);
      res.json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
};
