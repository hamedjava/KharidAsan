/**
 * مسیر: seller/infrastructure/database/mongoose/seller.model.js
 * وظایف:
 *  - تعریف مدل Mongoose برای ذخیره فروشنده در MongoDB
 *  - اعمال hook برای هش کردن رمز قبل از ذخیره
 */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const sellerSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobile: { type: String, required: true, unique: true },
  otp: { type: String }
}, { timestamps: true });

sellerSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model('Seller', sellerSchema);
