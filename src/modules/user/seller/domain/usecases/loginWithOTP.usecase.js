// seller/domain/usecases/loginWithOTP.usecase.js
const SellerRepository = require('../../infrastructure/repositories/seller.repository.js');
const OTPService = require('../../../../../modules/user/seller/application/services/otp.service.js'); // مسیر صحیح
const AuthService = require('../../../../../core/auth/application/services/auth.service.js');

class LoginWithOTPUseCase {
  async sendOTP(mobile) {
    if (!mobile) throw new Error('شماره موبایل الزامی است.');

    const normalized = String(mobile).trim();
    let seller = await SellerRepository.findByMobile(normalized);

    if (!seller) {
      console.warn('⚠️ فروشنده‌ای با این شماره یافت نشد، در حالت تست ساخت خودکار انجام می‌شود.');
      seller = await SellerRepository.create({
        email: `${normalized}@auto.created`,
        mobile: normalized,
        password: 'tempSellerPass123!',
        role: 'seller',
        shopName: 'Test Shop',
        ownerName: 'Auto Owner',
      });
    }

    const otpCode = OTPService.generateOTP(normalized);
    await SellerRepository.setOTP(normalized, otpCode);

    console.log(`✅ OTP برای فروشنده ${normalized}: ${otpCode}`);
    return { message: 'کد OTP ارسال شد.', otp: otpCode };
  }

  async verifyOTP(mobile, code) {
    if (!mobile || !code) throw new Error('شماره موبایل و کد OTP الزامی هستند.');

    const normalized = String(mobile).trim();
    const seller = await SellerRepository.findByMobile(normalized);

    if (!seller) throw new Error('فروشنده‌ای با این شماره یافت نشد.');
    if (seller.otp !== code) throw new Error('کد OTP معتبر نیست.');

    await SellerRepository.clearOTP(normalized);

    const token = AuthService.generateToken({ id: seller._id.toString(), role: 'seller' });
    return token;
  }
}

module.exports = new LoginWithOTPUseCase();
