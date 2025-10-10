// seller/domain/usecases/registerSeller.usecase.js
const SellerRepository = require('../../infrastructure/repositories/seller.repository.js');
const Seller = require('../entities/seller.entity.js');

module.exports = async function registerSeller(data) {
  const sellerEntity = new Seller(data);
  sellerEntity.validate();

  const existingSeller = await SellerRepository.findByMobile(data.mobile);
  if (existingSeller) throw new Error('این شماره موبایل قبلاً ثبت شده است.');

  return await SellerRepository.create(sellerEntity);
};
