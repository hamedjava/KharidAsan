/**
 * مسیر: seller/interfaces/controllers/sellerAuth.controller.js
 * وظایف:
 *  - ثبت‌نام فروشنده
 *  - ارسال و تایید OTP (ساخت JWT با role: 'seller')
 */
const registerSeller = require('../../domain/usecases/registerSeller.usecase');
const loginWithOTP = require('../../domain/usecases/loginWithOTP.usecase');

module.exports = {
    async register(req, res) {
        try {
            const seller = await registerSeller(req.body);
            res.status(201).json({
                message: 'Seller registered successfully',
                seller
            });
        } catch (err) {
            console.error("Register Seller Error:", err.message);
            res.status(400).json({ error: err.message });
        }
    },

    async sendOTP(req, res) {
        try {
            const { mobile } = req.body;
            if (!mobile) {
                return res.status(400).json({ error: 'Mobile number is required' });
            }

            const otp = await loginWithOTP.sendOTP(mobile);

            res.status(200).json({
                message: 'OTP sent successfully',
                otp // برای توسعه؛ در حالت production نباید OTP رو برگردونی
            });
        } catch (err) {
            console.error("Send OTP Error:", err.message);
            res.status(400).json({ error: err.message });
        }
    },

    async verifyOTP(req, res) {
        try {
            const { mobile, otp } = req.body;
            if (!mobile || !otp) {
                return res.status(400).json({ error: 'Mobile and OTP are required' });
            }

            // verifyJWT و log برای دیباگ دقیق
            const token = await loginWithOTP.verifyOTP(mobile, otp);
            console.log("Generated Seller Token:", token);

            res.status(200).json({
                message: 'OTP verified successfully',
                token // کلاینت باید این فیلد رو به Bearer Token بزنه
            });
        } catch (err) {
            console.error("Verify OTP Error:", err.message);
            res.status(400).json({ error: err.message });
        }
    }
};
