// مسیر فایل: src/shared/services/OtpService.js
// وظیفه: مدیریت تولید، ذخیره و اعتبارسنجی OTP برای کاربران.
// استفاده در همه‌ی نقش‌ها برای ورود با شماره موبایل.

import crypto from 'crypto';
import User from '../models/UserModel.js';

class OtpService {
  // تولید کد OTP تصادفی 6 رقمی
  static generateOtp() {
    return crypto.randomInt(100000, 999999).toString();
  }

  // ذخیره کد OTP در رکورد کاربر
  static async setOtpForUser(phoneNumber) {
    const otp = this.generateOtp();
    const expiry = new Date(Date.now() + 2 * 60 * 1000); // 2 دقیقه اعتبار
    await User.findOneAndUpdate(
      { phoneNumber },
      { otpCode: otp, otpExpiresAt: expiry },
      { new: true }
    );
    return otp;
  }

  // بررسی صحت کد OTP
  static async verifyOtp(phoneNumber, code) {
    const user = await User.findOne({ phoneNumber });
    if (!user) throw new Error('کاربر یافت نشد');

    if (user.otpCode !== code) throw new Error('کد OTP اشتباه است');
    if (new Date() > user.otpExpiresAt) throw new Error('کد OTP منقضی شده است');

    // پاک کردن OTP پس از استفاده
    user.otpCode = null;
    user.otpExpiresAt = null;
    await user.save();

    return true;
  }
}

export default OtpService;
