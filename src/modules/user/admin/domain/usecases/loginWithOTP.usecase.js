const AdminRepository = require('../../infrastructure/repositories/admin.repository');
const OTPService = require('../../application/services/otp.service');

class LoginWithOTPUseCase {
    async sendOTP(mobile) {
        const admin = await AdminRepository.findByMobile(mobile);
        if (!admin) {
            throw new Error('ادمینی با این شماره موبایل یافت نشد.');
        }

        const otpCode = OTPService.generateOTP(mobile);

        // در اینجا میتونی واقعی SMS بفرستی
        console.log(`OTP for ${mobile} => ${otpCode}`);

        return { message: 'کد OTP ارسال شد.', otp: otpCode }; // برای تست نمایش میدهیم
    }

    async verifyOTP(mobile, code) {
        OTPService.verifyOTP(mobile, code);

        const admin = await AdminRepository.findByMobile(mobile);
        if (!admin) {
            throw new Error('ادمینی با این شماره موبایل یافت نشد.');
        }

        return admin;
    }
}

module.exports = new LoginWithOTPUseCase();
