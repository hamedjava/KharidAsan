/**
 * مسیر: seller/domain/usecases/getSellerProfile.usecase.js
 * وظایف:
 *  - دریافت اطلاعات پروفایل فروشنده با استفاده از شناسه کاربر
 */
const sellerRepository = require('../../../seller/infrastructure/repositories/seller.repository.js');

module.exports = async function getSellerProfile(sellerId) {
  return sellerRepository.findById(sellerId);
};
