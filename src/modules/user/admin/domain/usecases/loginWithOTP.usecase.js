const AdminRepository = require('../../infrastructure/repositories/admin.repository.js');
const OTPService = require('../../application/services/otp.service.js');

class LoginWithOTPUseCase {
  async sendOTP(mobile) {
    if (!mobile) throw new Error('شماره موبایل الزامی است.');

    const normalized = String(mobile).trim();
    console.log(`📥 ارسال OTP برای موبایل: ${normalized}`);

    let admin = await AdminRepository.findByMobile(normalized);

    // برای اطمینان از تست، ادمین جدید ایجاد کن اگر وجود ندارد
    if (!admin) {
      console.warn('⚠️ ادمین یافت نشد، ساخت خودکار برای تست انجام می‌شود.');
      admin = await AdminRepository.create({
        email: `${normalized}@auto.created`,
        password: 'tempPass123!',
        mobile: normalized,
        role: 'admin',
      });
    }

    const otpCode = OTPService.generateOTP(normalized);
    console.log(`✅ OTP برای ${normalized} → ${otpCode}`);

    // برای تست، OTP را برمی‌گردانیم.
    return { message: 'کد OTP ارسال شد.', otp: otpCode };
  }

  async verifyOTP(mobile, code) {
    if (!mobile || !code) throw new Error('شماره موبایل و کد OTP الزامی هستند.');

    const normalized = String(mobile).trim();
    console.log(`📥 بررسی OTP برای ${normalized} با کد ${code}`);

    OTPService.verifyOTP(normalized, code);

    const admin = await AdminRepository.findByMobile(normalized);
    if (!admin) throw new Error('ادمینی با این شماره موبایل یافت نشد.');

    console.log(`✅ ادمین یافت شد: ${admin.email}`);

    return admin;
  }
}

module.exports = new LoginWithOTPUseCase();
