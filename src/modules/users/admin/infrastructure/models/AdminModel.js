import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobile: { type: String, required: true, unique: true },  // اضافه شده

  otpCode: { type: String },          // کد OTP ذخیره می‌شود
  otpExpire: { type: Date },          // تاریخ انقضای کد OTP
  isOtpVerified: { type: Boolean, default: false },  // آیا موبایل تایید شده یا خیر

  // اگر فیلدهای حیاتی دیگه‌ای مد نظر دارید اضافه کنید، مثلا:
  email: { type: String, unique: true, sparse: true },
  fullName: { type: String },
  // ...

}, {
  timestamps: true,
});

const AdminModel = mongoose.model('Admin', AdminSchema);

export default AdminModel;
