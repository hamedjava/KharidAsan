/**
 * مسیر: seller/domain/usecases/loginWithOTP.usecase.js
 * وظیفه: کنترل پروسه ارسال و تایید OTP برای فروشنده، و تولید JWT معتبر با نقش seller.
 */

const sellerRepository = require('../../../seller/infrastructure/repositories/seller.repository.js');
const otpService = require('../../application/services/otp.service');
const jwt = require('jsonwebtoken');

const loginWithOTPUseCase = {
  /**
   * ارسال OTP به شماره موبایل فروشنده
   * @param {String} mobile شماره موبایل فروشنده
   * @returns {Promise<String>} OTP تولیدشده (در حالت dev نمایش داده می‌شود)
   */
  async sendOTP(mobile) {
    if (!mobile) throw new Error('Mobile number is required');

    const seller = await sellerRepository.findByMobile(mobile);
    if (!seller) throw new Error('Seller not found');

    // تولید OTP و ذخیره در DB
    const otp = otpService.generateOTP();
    await sellerRepository.setOTP(mobile, otp);

    console.log(`[sendOTP] OTP for ${mobile}: ${otp}`); // برای توسعه (در production حذف شود)

    // در محیط DEV برمی‌گردانیم، در production فقط یک پیام success ارسال می‌شود
    return otp;
  },

  /**
   * تایید OTP و صدور JWT برای احراز هویت فروشنده
   * @param {String} mobile شماره موبایل فروشنده
   * @param {String|Number} otpInput کد OTP واردشده توسط کاربر
   * @returns {Promise<String>} JWT Token معتبر
   */
  async verifyOTP(mobile, otpInput) {
    if (!mobile || !otpInput) {
      throw new Error('Both mobile and otp are required');
    }
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }

    // مرحله ۱: یافتن فروشنده از طریق شماره
    const seller = await sellerRepository.findByMobile(mobile);
    if (!seller) throw new Error('Seller not found');

    // مرحله ۲: مقایسه OTP (به صورت رشته برای اطمینان از تطبیق)
    if (String(seller.otp) !== String(otpInput)) {
      throw new Error('Invalid or expired OTP');
    }

    // مرحله ۳: پاک کردن OTP بعد از مصرف موفقیت‌آمیز
    await sellerRepository.clearOTP(mobile);

    // مرحله ۴: ساخت payload توکن JWT
    const payload = {
      id: seller._id.toString(),
      role: 'seller',
      mobile: seller.mobile
    };

    // مرحله ۵: ساخت JWT معتبر با زمان انقضای مناسب
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

    // مرحله ۶: لاگ‌های دیباگ (در حالت production غیرفعال شود)
    console.log('[verifyOTP] Seller verified successfully:', seller._id.toString());
    console.log('[verifyOTP] JWT Payload:', payload);
    console.log('[verifyOTP] Generated Token:', token);
    console.log('[verifyOTP] Decoded Token:', jwt.decode(token));

    return token;
  }
};

module.exports = loginWithOTPUseCase;
