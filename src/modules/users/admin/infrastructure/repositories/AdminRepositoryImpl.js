import AdminModel from '../models/AdminModel.js';

export default class AdminRepositoryImpl {
  async create(adminData) {
    try {
      return await AdminModel.create(adminData);
    } catch (err) {
      throw new Error('ایجاد ادمین با خطا مواجه شد: ' + err.message);
    }
  }

  async findAll() {
    return await AdminModel.find();
  }

  async findByMobile(mobile) {
    return await AdminModel.findOne({ mobile });
  }

  async setOtp(mobile, otp, expire) {
    // ذخیره otp و زمان انقضا
    return await AdminModel.findOneAndUpdate(
      { mobile },
      { otpCode: otp, otpExpire: expire, isOtpVerified: false },
      { new: true }
    );
  }

  async verifyOtp(mobile, otp) {
    const admin = await AdminModel.findOne({ mobile, otpCode: otp, otpExpire: { $gt: new Date() } });
    if (!admin) return null;
    // بروزرسانی برای تایید OTP
    admin.isOtpVerified = true;
    admin.otpCode = null;
    admin.otpExpire = null;
    await admin.save();
    return admin;
  }

  // اگر لازم داری بقیه متدهای استاندارد CRUD

  async findById(id) {
    return await AdminModel.findById(id);
  }
  
  async update(id, data) {
    return await AdminModel.findByIdAndUpdate(id, data, { new: true });
  }
  
  async delete(id) {
    return await AdminModel.findByIdAndDelete(id);
  }
}
