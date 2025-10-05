const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const routes = require('./interfaces/http/routes');

const app = express();

// 🛡️ پیکربندی امنیت و میان‌افزارها
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// 🚦 محدودیت تعداد درخواست‌ها در هر دقیقه
app.use(rateLimit({ windowMs: 60 * 1000, max: 60 }));

// 📌 مسیر اصلی API
app.use('/api', routes);

// ⚠️ مدیریت خطاهای کلی
app.use((err, req, res, next) => {
  console.error('🔥 خطا:', err);
  res.status(err.statusCode || 500).json({
    موفق: false,
    پیام: err.message || 'خطای داخلی سرور',
  });
});

module.exports = app;
