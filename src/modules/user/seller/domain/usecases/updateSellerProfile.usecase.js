/**
 * مسیر: seller/domain/usecases/updateSellerProfile.usecase.js
 * وظایف:
 *  - بروزرسانی اطلاعات پروفایل فروشنده
 */
const sellerRepository = require('../../../seller/infrastructure/repositories/seller.repository');

module.exports = async function updateSellerProfile(sellerId, data) {
  return sellerRepository.updateById(sellerId, data);
};
