// مسیر فایل: seller/infrastructure/models/SellerModel.js
// شرح وظایف: این فایل اسکیمای Mongoose برای ذخیره‌سازی فروشنده در پایگاه داده MongoDB را تعریف می‌کند.
// شامل فیلدهای اصلی فروشنده، فیلدهای OTP و تنظیمات زمان‌بندی است.

import mongoose from 'mongoose';

const SellerSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobile: { type: String, required: true, unique: true },
  otpCode: { type: String },
  otpExpire: { type: Date },
  isOtpVerified: { type: Boolean, default: false },
  email: { type: String, unique: true, sparse: true },
  fullName: { type: String }
}, {
  timestamps: true,
});

const SellerModel = mongoose.model('Seller', SellerSchema);

export default SellerModel;
