/**
 * مسیر: seller/interfaces/middlewares/sellerAuth.middleware.js
 * وظایف:
 *  - بررسی توکن JWT و اجازه دسترسی به روت‌های محافظت‌شده فروشنده (با پیام خطای دقیق‌تر و تحمل فاصله‌های اضافی)
 */
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const sellerRepository = require('../../infrastructure/repositories/seller.repository.js');

module.exports = async (req, res, next) => {
  let authHeader = req.headers.authorization;

  // 🔹 اگر هدر وجود ندارد
  if (!authHeader) {
    console.warn('⚠️ No Authorization header provided');
    return res.status(401).json({ error: 'Authorization header is missing. Expected format: Bearer <token>' });
  }

  // ✅ حذف فاصله‌های اضافی ابتدا و انتهای هدر
  authHeader = authHeader.trim();

  // 🔹 بررسی فرمت صحیح Bearer (case-insensitive)
  if (!authHeader.toLowerCase().startsWith('bearer ')) {
    console.warn('⚠️ Authorization header format invalid:', authHeader);
    return res.status(401).json({ error: 'Invalid Authorization header format. Expected: Bearer <token>' });
  }

  // ✅ جدا کردن توکن و حذف فاصله‌های اضافی
  const token = authHeader.slice(7).trim(); // حذف کلمه Bearer (7 کاراکتر) و سپس trim

  // 🔹 بررسی اینکه توکن خالی نباشد
  if (!token) {
    console.warn('⚠️ Token is empty after Bearer');
    return res.status(401).json({ error: 'JWT token is missing after Bearer keyword' });
  }

  try {
    console.log('🔍 Using JWT_SECRET:', process.env.JWT_SECRET);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('✅ Decoded JWT Payload:', decoded);

    // 🔹 بررسی نقش (role)
    if (!decoded.role) {
      console.warn('⚠️ No role found in token payload');
      return res.status(401).json({ error: 'Role is missing in token payload' });
    }
    if (decoded.role !== 'seller') {
      console.warn(`⚠️ Role mismatch in token: expected 'seller', got '${decoded.role}'`);
      return res.status(403).json({ error: 'Access denied. Token role is not seller' });
    }

    // 🔹 بررسی ID فروشنده
    if (!decoded.id || !mongoose.Types.ObjectId.isValid(decoded.id)) {
      console.warn('⚠️ Invalid seller ID in token payload:', decoded.id);
      return res.status(401).json({ error: 'Invalid seller ID in token payload' });
    }

    const sellerId = new mongoose.Types.ObjectId(decoded.id);

    // 🔹 گرفتن اطلاعات فروشنده از دیتابیس
    const seller = await sellerRepository.findById(sellerId);
    if (!seller) {
      console.warn(`⚠️ Seller not found in database. ID: ${decoded.id}`);
      return res.status(404).json({ error: 'Seller not found in database' });
    }

    // 🔹 ذخیره اطلاعات فروشنده در req
    req.seller = {
      id: seller._id.toString(),
      role: decoded.role,
      email: seller.email,
      mobile: seller.mobile
    };

    console.log('✅ Seller authenticated:', req.seller);
    next();

  } catch (err) {
    console.error('❌ JWT verification error:', err.message);
    return res.status(401).json({ error: `Invalid token: ${err.message}` });
  }
};
