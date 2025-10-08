// modules/user/admin/interfaces/middlewares/adminAuth.middleware.js

const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const AdminRepository = require('../../infrastructure/repositories/admin.repository');

// کلید مخفی JWT (از env)
const JWT_SECRET = process.env.JWT_SECRET || 'mysecretkey';

module.exports = async function adminAuth(req, res, next) {
    try {
        // گرفتن Authorization header
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            return res.status(401).json({ error: 'توکن احراز هویت یافت نشد' });
        }

        // بررسی فرمت توکن
        if (!authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'فرمت توکن باید Bearer باشد' });
        }

        const token = authHeader.split(' ')[1];

        // Decode کردن توکن
        const decoded = jwt.verify(token, JWT_SECRET);

        if (!decoded.id) {
            return res.status(401).json({ error: 'توکن نامعتبر است' });
        }

        // تبدیل id به ObjectId برای MongoDB
        const adminId = new mongoose.Types.ObjectId(decoded.id);

        // بررسی وجود ادمین در دیتابیس
        const admin = await AdminRepository.findById(adminId);
        if (!admin) {
            return res.status(400).json({ error: 'ادمین معتبر یافت نشد.' });
        }

        // افزودن adminId به req برای استفاده در کنترلر
        req.adminId = admin._id.toString();

        next(); // ادامه مسیر
    } catch (err) {
        return res.status(401).json({ error: 'توکن نامعتبر یا منقضی شده است' });
    }
};
