import CustomerModel from '../models/CustomerModel.js';

export default class CustomerRepositoryImpl {
  async create(customerData) {
    try {
      return await CustomerModel.create(customerData);
    } catch (err) {
      throw new Error('ایجاد مشتری با خطا مواجه شد: ' + err.message);
    }
  }

  async findAll() {
    return await CustomerModel.find();
  }

  async findByMobile(mobile) {
    return await CustomerModel.findOne({ mobile });
  }

  async setOtp(mobile, otp, expire) {
    return await CustomerModel.findOneAndUpdate(
      { mobile },
      { otpCode: otp, otpExpire: expire, isOtpVerified: false },
      { new: true }
    );
  }

  async verifyOtp(mobile, otp) {
    const customer = await CustomerModel.findOne({ mobile, otpCode: otp, otpExpire: { $gt: new Date() } });
    if (!customer) return null;

    customer.isOtpVerified = true;
    customer.otpCode = null;
    customer.otpExpire = null;
    await customer.save();
    return customer;
  }

  async findById(id) {
    return await CustomerModel.findById(id);
  }

  async update(id, data) {
    return await CustomerModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return await CustomerModel.findByIdAndDelete(id);
  }
}
