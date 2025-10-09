const customerRepository = require('../../infrastructure/repositories/customer.repository');
const otpService = require('../../application/services/otp.service');

module.exports = async function loginWithOtpUseCase(mobile) {
  const customer = await customerRepository.findByMobile(mobile);
  if (!customer) throw new Error('Customer not found');

  const code = otpService.generateOtp();
  const expiresAt = new Date(Date.now() + 2 * 60 * 1000);
  await customerRepository.updateById(customer.id, { otp: { code, expiresAt } });

  await otpService.sendOtp(mobile, code);
  return { message: 'OTP sent successfully' };
};
