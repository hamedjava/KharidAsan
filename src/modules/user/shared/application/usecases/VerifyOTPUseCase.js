import jwt from 'jsonwebtoken';

export class VerifyOTPUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ mobile, otpCode }) {
    const user = await this.userRepository.findByMobile(mobile);
    if (!user) throw new Error('User not found');

    if (
      user.otpCode !== otpCode ||
      !user.otpExpiresAt ||
      user.otpExpiresAt < new Date()
    ) {
      throw new Error('Invalid or expired OTP');
    }

    user.otpCode = null;
    user.otpExpiresAt = null;
    await user.save();

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return { token, user };
  }
}
