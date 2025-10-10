const jwt = require('jsonwebtoken');
const RegisterAdminUseCase = require('../../../../user/admin/domain/usecases/registerAdmin.usecase.js');
const LoginWithOTPUseCase = require('../../../../user/admin/domain/usecases/loginWithOTP.usecase.js');
const AuthService = require('../../../../../core/auth/application/services/auth.service.js');

class AdminAuthController {
  async register(req, res) {
    try {
      const { email, password, mobile } = req.body;
      if (!email || !password || !mobile) {
        return res.status(400).json({ error: 'ایمیل، رمز عبور و موبایل الزامی هستند.' });
      }

      const admin = await RegisterAdminUseCase.execute({ email, password, mobile });
      res.status(201).json({ message: 'ثبت‌نام موفق', admin });
    } catch (err) {
      console.error('❌ register error:', err.message);
      res.status(400).json({ error: err.message });
    }
  }

  async sendOTP(req, res) {
    try {
      const { mobile } = req.body;
      console.log('📨 sendOTP controller: mobile =', mobile);
      const result = await LoginWithOTPUseCase.sendOTP(mobile);
      res.status(200).json(result);
    } catch (err) {
      console.error('❌ sendOTP error:', err.message);
      res.status(400).json({ error: err.message });
    }
  }

  async verifyOTP(req, res) {
    try {
      const { mobile, otp } = req.body;
      console.log('📨 verifyOTP controller: mobile =', mobile, 'otp =', otp);
      const admin = await LoginWithOTPUseCase.verifyOTP(mobile, otp);
      const token = AuthService.generateToken({ id: admin._id.toString(), role: 'admin' });
      res.status(200).json({ message: 'ورود موفق', token });
    } catch (err) {
      console.error('❌ verifyOTP error:', err.message);
      res.status(400).json({ error: err.message });
    }
  }
}

module.exports = new AdminAuthController();
