/**
 * مسیر: seller/domain/usecases/changePassword.usecase.js
 */
const sellerRepository = require('../../infrastructure/repositories/seller.repository');
const bcrypt = require('bcrypt');

module.exports = async (sellerId, oldPassword, newPassword) => {
  const seller = await sellerRepository.findById(sellerId);
  if (!seller) throw new Error('Seller not found');

  const isMatch = await bcrypt.compare(oldPassword, seller.password);
  if (!isMatch) throw new Error('Current password is incorrect');

  const hashed = await bcrypt.hash(newPassword, 10);
  seller.password = hashed;
  await seller.save();

  return { message: 'Password changed successfully' };
};
