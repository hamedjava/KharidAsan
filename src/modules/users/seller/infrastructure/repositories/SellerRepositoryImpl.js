// مسیر فایل: seller/infrastructure/repositories/SellerRepositoryImpl.js
// شرح وظایف: این کلاس عملیات CRUD و مدیریت OTP را برای موجودیت Seller پیاده‌سازی می‌کند.
// این کلاس تمام ارتباطات با مدل Mongoose فروشنده را مدیریت می‌کند.

import SellerModel from '../models/SellerModel.js';

export default class SellerRepositoryImpl {
  async create(sellerData) {
    try {
      return await SellerModel.create(sellerData);
    } catch (err) {
      throw new Error('ایجاد فروشنده با خطا مواجه شد: ' + err.message);
    }
  }

  async findAll() {
    return await SellerModel.find();
  }

  async findByMobile(mobile) {
    return await SellerModel.findOne({ mobile });
  }

  async setOtp(mobile, otp, expire) {
    return await SellerModel.findOneAndUpdate(
      { mobile },
      { otpCode: otp, otpExpire: expire, isOtpVerified: false },
      { new: true }
    );
  }

  async verifyOtp(mobile, otp) {
    const seller = await SellerModel.findOne({ mobile, otpCode: otp, otpExpire: { $gt: new Date() } });
    if (!seller) return null;
    seller.isOtpVerified = true;
    seller.otpCode = null;
    seller.otpExpire = null;
    await seller.save();
    return seller;
  }

  async findById(id) {
    return await SellerModel.findById(id);
  }

  async update(id, data) {
    return await SellerModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return await SellerModel.findByIdAndDelete(id);
  }
}
