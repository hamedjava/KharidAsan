const jwt = require('jsonwebtoken');
const RegisterAdminUseCase = require('../../domain/usecases/registerAdmin.usecase');
const LoginWithOTPUseCase = require('../../domain/usecases/loginWithOTP.usecase');

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
            res.status(400).json({ error: err.message });
        }
    }

    async sendOTP(req, res) {
        try {
            const { mobile } = req.body;
            const result = await LoginWithOTPUseCase.sendOTP(mobile);
            res.status(200).json(result);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    async verifyOTP(req, res) {
        try {
            const { mobile, otp } = req.body;
            const admin = await LoginWithOTPUseCase.verifyOTP(mobile, otp);
            const token = jwt.sign(
                { id: admin._id.toString(), email: admin.email, role: 'admin' },
                process.env.JWT_SECRET,
                { expiresIn: '1d' }
            );
            res.status(200).json({ message: 'ورود موفق', token });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
}

module.exports = new AdminAuthController();
