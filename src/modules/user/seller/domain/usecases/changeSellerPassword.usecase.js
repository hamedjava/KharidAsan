const bcrypt = require('bcryptjs');
const sellerRepository = require('../../infrastructure/repositories/seller.repository.js');

module.exports = async (sellerId, currentPassword, newPassword, confirmNewPassword) => {
  // چک ورودی‌ها
  if (!currentPassword || !newPassword || !confirmNewPassword) {
    const err = new Error('All password fields are required');
    err.status = 400;
    throw err;
  }

  if (newPassword !== confirmNewPassword) {
    const err = new Error('New passwords do not match');
    err.status = 400;
    throw err;
  }

  if (newPassword.length < 6) {
    const err = new Error('New password must be at least 6 characters long');
    err.status = 400;
    throw err;
  }

  // پیدا کردن فروشنده
  const seller = await sellerRepository.findById(sellerId);
  if (!seller) {
    const err = new Error('Seller not found');
    err.status = 404;
    throw err;
  }

  // بررسی رمز فعلی
  const isMatch = await bcrypt.compare(currentPassword, seller.password);
  if (!isMatch) {
    const err = new Error('Current password is incorrect');
    err.status = 401;
    throw err;
  }

  // هش کردن رمز جدید
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // آپدیت در دیتابیس
  seller.password = hashedPassword;
  await seller.save();

  return { id: seller.id, email: seller.email, mobile: seller.mobile };
};
