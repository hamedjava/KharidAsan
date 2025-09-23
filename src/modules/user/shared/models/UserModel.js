// مسیر فایل: src/shared/models/UserModel.js
// وظیفه: تعریف مدل اصلی کاربر در MongoDB با استفاده از Mongoose.
// این مدل برای همه‌ی نقش‌ها (customer, seller, admin) مشترک است.
// شامل فیلدهای کامل مشخصات کاربر و اطلاعات احراز هویت است.

import mongoose from 'mongoose';

// تعریف ساختار اسکیمای کاربر
const userSchema = new mongoose.Schema(
  {
    // نام کامل کاربر
    fullName: { type: String, required: true, trim: true },

    // شماره موبایل کاربر (برای ورود با OTP)
    phoneNumber: { type: String, required: true, unique: true },

    // ایمیل (برای ثبت‌نام)
    email: { type: String, required: true, unique: true, lowercase: true },

    // پسورد هش‌شده (برای ثبت‌نام)
    password: { type: String, required: true },

    // نقش کاربر - اینجا مستقیم نگه‌داریم چون Role entity نداریم
    // فقط یکی از سه مقدار: "seller", "admin", "customer"
    role: { 
      type: String, 
      enum: ['seller', 'admin', 'customer'], 
      required: true 
    },

    // کد OTP برای ورود سریع
    otpCode: { type: String, default: null },

    // زمان انقضای OTP
    otpExpiresAt: { type: Date, default: null },

    // اطلاعات پروفایل اضافی
    address: { type: String },
    avatarUrl: { type: String },

    // وضعیت حساب (فعال/غیرفعال)
    isActive: { type: Boolean, default: true }
  },
  {
    timestamps: true // تاریخ ایجاد و آخرین بروزرسانی
  }
);

export default mongoose.model('User', userSchema);
