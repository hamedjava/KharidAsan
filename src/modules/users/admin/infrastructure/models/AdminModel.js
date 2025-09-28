import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },           // نام کاربری ادمین
  password: { type: String, required: true },                         // رمز عبور هش شده
  mobile: { type: String, required: true, unique: true },              // شماره موبایل برای OTP

  // 🔐 فیلدهای مربوط به OTP
  otpCode: { type: String },                                          // کد OTP
  otpExpire: { type: Date },                                          // زمان انقضای OTP
  isOtpVerified: { type: Boolean, default: false },                   // وضعیت تایید موبایل
  
  // 📧 اطلاعات اضافی
  email: { type: String, unique: true, sparse: true },                 // ایمیل (یونیک اما غیرضروری)
  fullName: { type: String },                                          // نام کامل
  
  // 🛡 نقش ادمین برای کنترل سطح دسترسی
  role: { type: String, enum: ['super_admin', 'manager'], default: 'manager' },

}, {
  timestamps: true,
});

const AdminModel = mongoose.model('Admin', AdminSchema);

export default AdminModel;
