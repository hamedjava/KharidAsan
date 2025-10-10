const customerRepository = require('../../infrastructure/repositories/customer.repository');
const otpService = require('../../../customer/application/services/otp.service.js');
const authService = require('../../../../../core/auth/application/services/auth.service.js');

class LoginWithOtpUseCase {
  async sendOTP(mobile) {
    const normalized = String(mobile).trim();
    let customer = await customerRepository.findByMobile(normalized);

    if (!customer) {
      console.warn('⚠️ Customer not found, creating new (test mode)');
      customer = await customerRepository.create({
        name: 'Auto Customer',
        email: `${normalized}@auto.customer`,
        mobile: normalized,
        password: 'Temp@123',
        role: 'customer',
      });
    }

    const code = otpService.generateOtp();
    const expiresAt = new Date(Date.now() + 2 * 60 * 1000);
    await customerRepository.updateById(customer.id, { otp: { code, expiresAt } });

    await otpService.sendOtp(normalized, code);
    return { message: 'OTP sent successfully', otp: code };
  }

  async verifyOTP(mobile, otp) {
    const normalized = String(mobile).trim();
    const customer = await customerRepository.findByMobile(normalized);

    if (!customer || !customer.otp || customer.otp.code !== otp)
      throw new Error('Invalid OTP');
    if (new Date() > new Date(customer.otp.expiresAt))
      throw new Error('OTP expired');

    await customerRepository.updateById(customer.id, { otp: null });

    const token = authService.generateToken({ id: customer.id, role: 'customer' });
    return { message: 'Login successful', token };
  }
}

module.exports = new LoginWithOtpUseCase();
