import crypto from 'crypto';

export class LoginWithOTPUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(mobile) {
    const otpCode = crypto.randomInt(100000, 999999).toString();
    const otpExpiresAt = new Date(Date.now() + 2 * 60 * 1000);

    let user = await this.userRepository.findByMobile(mobile);
    if (!user) {
      // کاربر جدید ایجاد بشه یا ارور بده؟ اینو بعداً تصمیم می‌گیریم
      throw new Error('User not found');
    }

    user.otpCode = otpCode;
    user.otpExpiresAt = otpExpiresAt;
    await user.save();

    return { otpCode, otpExpiresAt }; // توی واقعی SMS ارسال میشه
  }
}
