// seller/interfaces/controllers/sellerAuth.controller.js
const registerSeller = require('../../domain/usecases/registerSeller.usecase.js');
const loginWithOTP = require('../../domain/usecases/loginWithOTP.usecase.js');

module.exports = {
  async register(req, res) {
    try {
      const { email, mobile, password } = req.body;
      if (!email || !mobile || !password)
        return res.status(400).json({ error: 'ایمیل، موبایل و رمز عبور الزامی هستند.' });

      const seller = await registerSeller({ email, mobile, password });
      res.status(201).json({ message: 'ثبت فروشنده موفق', seller });
    } catch (err) {
      console.error('❌ registerSeller error:', err.message);
      res.status(400).json({ error: err.message });
    }
  },

  async sendOTP(req, res) {
    try {
      const { mobile } = req.body;
      console.log('📨 seller sendOTP controller →', mobile);
      const result = await loginWithOTP.sendOTP(mobile);
      res.status(200).json(result);
    } catch (err) {
      console.error('❌ seller sendOTP error:', err.message);
      res.status(400).json({ error: err.message });
    }
  },

  async verifyOTP(req, res) {
    try {
      const { mobile, otp } = req.body;
      console.log('📨 seller verifyOTP controller →', mobile, otp);
      const token = await loginWithOTP.verifyOTP(mobile, otp);
      res.status(200).json({ message: 'ورود موفق', token });
    } catch (err) {
      console.error('❌ seller verifyOTP error:', err.message);
      res.status(400).json({ error: err.message });
    }
  },
};
