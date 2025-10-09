/**
 * مسیر: seller/domain/usecases/registerSeller.usecase.js
 * وظایف:
 *  - منطق ثبت‌نام فروشنده جدید
 *  - ذخیره فروشنده در دیتابیس از طریق Repository
 */
const sellerRepository = require('../../../seller/infrastructure/repositories/seller.repository.js');

module.exports = async function registerSeller(data) {
  return sellerRepository.create(data);
};
