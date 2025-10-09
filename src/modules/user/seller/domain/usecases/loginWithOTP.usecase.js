/**
 * مسیر: seller/domain/usecases/loginWithOTP.usecase.js
 */
const sellerRepository = require('../../../seller/infrastructure/repositories/seller.repository.js');
const otpService = require('../../application/services/otp.service');
const jwt = require('jsonwebtoken');

module.exports = {
  
  // ارسال OTP
  async sendOTP(mobile) {
    const seller = await sellerRepository.findByMobile(mobile);
    if (!seller) throw new Error('Seller not found');

    const otp = otpService.generateOTP();
    await sellerRepository.setOTP(mobile, otp);

    console.log(`[sendOTP] OTP for ${mobile}:`, otp); // برای تست و دیباگ

    return otp; // در محیط dev برای تست برمیگردونیم
  },

  // تایید OTP و صدور JWT
  async verifyOTP(mobile, otpInput) {
    console.log(`[verifyOTP] mobile: ${mobile}, input: ${otpInput}`);
    console.log(`[verifyOTP] JWT_SECRET:`, process.env.JWT_SECRET);

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }

    const seller = await sellerRepository.findByMobile(mobile);
    if (!seller) throw new Error('Seller not found');

    console.log(`[verifyOTP] Found Seller:`, seller._id.toString());

    // ✅ مقایسه مطمئن با Type یکسان
    if (String(seller.otp) !== String(otpInput)) {
      throw new Error('Invalid OTP');
    }

    // پاک کردن OTP بعد از استفاده
    await sellerRepository.clearOTP(mobile);

    // ساخت payload کامل
    const payload = {
      id: seller._id.toString(),
      role: 'seller'
    };

    console.log(`[verifyOTP] JWT Payload:`, payload);

    // ساخت توکن
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    console.log(`[verifyOTP] Generated Token:`, token);

    // Decode فقط برای دیباگ
    console.log(`[verifyOTP] Decoded Payload:`, jwt.decode(token));

    return token;
  }
};
