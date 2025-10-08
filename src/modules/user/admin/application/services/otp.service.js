// modules/user/admin/application/services/otp.service.js
class OTPService {
    constructor() {
        this.otpStore = new Map(); // حافظه موقت برای نگه‌داری OTP (میتونه Redis باشه)
    }

    generateOTP(mobile) {
        const otpCode = Math.floor(10000 + Math.random() * 90000).toString();
        const expires = Date.now() + 2 * 60 * 1000; // 2 دقیقه اعتبار

        this.otpStore.set(mobile, { code: otpCode, expires });

        return otpCode;
    }

    verifyOTP(mobile, code) {
        const record = this.otpStore.get(mobile);
        if (!record) throw new Error('کد OTP ارسال نشده است.');
        if (record.expires < Date.now()) {
            this.otpStore.delete(mobile);
            throw new Error('کد OTP منقضی شده است.');
        }
        if (record.code !== code) {
            throw new Error('کد OTP اشتباه است.');
        }

        this.otpStore.delete(mobile);
        return true;
    }

    clearOTP(mobile) {
        this.otpStore.delete(mobile);
    }
}

module.exports = new OTPService();
