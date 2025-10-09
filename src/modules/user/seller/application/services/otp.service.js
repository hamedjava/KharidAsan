/**
 * مسیر: seller/application/services/otp.service.js
 * وظایف:
 *  - تولید کد OTP به صورت تصادفی برای فرآیند ورود یا تأیید شماره موبایل فروشنده
 */
module.exports = {
    generateOTP() {
      return Math.floor(100000 + Math.random() * 900000).toString();
    }
  };
  