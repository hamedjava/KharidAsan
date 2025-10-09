/**
 * مسیر: seller/infrastructure/repositories/seller.repository.js
 * وظایف:
 *  - ارتباط مستقیم با دیتابیس برای عملیات CRUD فروشنده
 *  - مدیریت OTP فروشنده
 */
const Seller = require('../../../seller/infrastructure/mongoose/seller.model.js');

module.exports = {
  create(data) {
    return Seller.create(data);
  },
  findByMobile(mobile) {
    return Seller.findOne({ mobile });
  },
  findById(id) {
    return Seller.findById(id);
  },
  updateById(id, update) {
    return Seller.findByIdAndUpdate(id, update, { new: true });
  },
  setOTP(mobile, otp) {
    return Seller.findOneAndUpdate({ mobile }, { otp }, { new: true });
  },
  clearOTP(mobile) {
    return Seller.findOneAndUpdate({ mobile }, { otp: null }, { new: true });
  }
};
