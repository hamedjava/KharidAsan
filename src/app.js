// بارگذاری ماژول‌های اصلی
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

// ایجاد اپ
const app = express();

// 🛡 حفاظت امنیتی پایه
app.use(helmet());

// 🌐 فعالسازی CORS
app.use(cors());

// 📦 قابلیت پردازش JSON و فرم دیتا
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 📝 لاگ درخواست‌ها
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// ⏳ محدودیت تعداد درخواست‌ها
app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 دقیقه
    max: 100, // حداکثر 100 درخواست
    message: { error: 'تعداد درخواست‌های شما بیش از حد مجاز است' }
}));

// 📌 مسیرهای Admin
const adminAuthRoutes = require('./modules/user/admin/interfaces/http/admin.routes');
const adminProfileRoutes = require('./modules/user/admin/interfaces/http/adminProfile.routes');


app.use('/api/admin', adminAuthRoutes);
app.use('/api/admin', adminProfileRoutes);

// 🛠  مسیرهای اشتباه
app.use((req, res) => {
    res.status(404).json({ error: 'مسیر مورد نظر یافت نشد' });
});

// ⚠️ هندل خطاها
app.use((err, req, res, next) => {
    console.error('❌ خطای داخلی سرور:', err.stack);
    res.status(500).json({ error: 'خطای داخلی سرور' });
});

module.exports = app;
