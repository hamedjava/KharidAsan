// مسیر فایل: seller/interface/controllers/SellerController.js
// شرح وظایف: این کنترلر تمام عملیات مربوط به فروشنده را مدیریت می‌کند.
// شامل CRUD، ارسال و ورود با OTP، ورود با ایمیل و رمز عبور.

import Seller from '../../../../../modules/users/seller/infrastructure/models/SellerModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import otpService from '../../../../../shared/services/otpService.js';


// 🔹 ایجاد فروشنده
export const createSeller = async (req, res) => {
  try {
    const { username, fullName, email, password, mobile } = req.body;

    if (!username || !fullName || !email || !password || !mobile) {
      return res.status(400).json({ error: 'تمام فیلدها الزامی هستند' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const seller = new Seller({ username, fullName, email, password: hashedPassword, mobile });
    const savedSeller = await seller.save();

    res.status(201).json(savedSeller);
  } catch (err) {
    res.status(500).json({ error: 'خطای داخلی سرور' });
  }
};


// 🔹 دریافت همه فروشنده‌ها
export const getSellers = async (req, res) => {
  try {
    const sellers = await Seller.find();
    res.json(sellers);
  } catch (err) {
    res.status(500).json({ error: 'خطای داخلی سرور' });
  }
};


// 🔹 دریافت فروشنده بر اساس ID
export const getSellerById = async (req, res) => {
  try {
    const seller = await Seller.findById(req.params.id);
    if (!seller) return res.status(404).json({ error: 'فروشنده یافت نشد' });
    res.json(seller);
  } catch (err) {
    res.status(500).json({ error: 'خطای داخلی سرور' });
  }
};


// 🔹 بروزرسانی فروشنده
export const updateSeller = async (req, res) => {
  try {
    const updated = await Seller.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'فروشنده یافت نشد' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'خطای داخلی سرور' });
  }
};


// 🔹 حذف فروشنده
export const deleteSeller = async (req, res) => {
  try {
    const deleted = await Seller.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'فروشنده یافت نشد' });
    res.json({ message: 'فروشنده حذف شد' });
  } catch (err) {
    res.status(500).json({ error: 'خطای داخلی سرور' });
  }
};


// 🔹 ارسال OTP
export const sendOtp = async (req, res) => {
  try {
    const { mobile } = req.body;
    const seller = await Seller.findOne({ mobile });

    if (!seller) return res.status(404).json({ error: 'فروشنده یافت نشد' });

    const otpGenerated = otpService.generateOtp();
    seller.otpCode = otpGenerated;
    seller.otpExpire = otpService.getExpireDate();
    await seller.save();

    res.status(200).json({ message: 'کد OTP ارسال شد', otpCode: otpGenerated }); // OTP برای تست
  } catch (err) {
    res.status(500).json({ error: 'خطای داخلی سرور' });
  }
};


// 🔹 ورود با OTP
export const loginWithOTP = async (req, res) => {
  try {
    const { mobile, otp } = req.body;

    if (!mobile || !otp) {
      return res.status(400).json({ error: 'موبایل و کد OTP الزامی هستند' });
    }

    const seller = await Seller.findOne({ mobile });
    if (!seller) return res.status(404).json({ error: 'فروشنده یافت نشد' });
    if (seller.otpCode !== otp) return res.status(401).json({ error: 'OTP اشتباه' });
    if (Date.now() > seller.otpExpire) return res.status(401).json({ error: 'OTP منقضی شده' });

    const token = jwt.sign(
      { id: seller._id, email: seller.email },
      process.env.JWT_SECRET || 'test_secret',
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'ورود موفق با OTP', token, seller });
  } catch (err) {
    res.status(500).json({ error: 'خطای داخلی سرور' });
  }
};


// 🔹 ورود با ایمیل و رمز عبور
export const loginWithEmail = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ اضافه کردن اعتبارسنجی اولیه برای جلوگیری از 404
    if (!email || !password) {
      return res.status(400).json({ error: 'ایمیل و رمز عبور الزامی است' });
    }

    const seller = await Seller.findOne({ email });
    if (!seller) return res.status(404).json({ error: 'فروشنده یافت نشد' });

    const isMatch = await bcrypt.compare(password, seller.password);
    if (!isMatch) return res.status(401).json({ error: 'رمز عبور اشتباه است' });

    const token = jwt.sign(
      { id: seller._id, email: seller.email },
      process.env.JWT_SECRET || 'test_secret',
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'ورود موفق', token, seller });
  } catch (err) {
    res.status(500).json({ error: 'خطای داخلی سرور' });
  }
};
