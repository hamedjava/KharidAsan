// ===========================
// 📦 وارد کردن کتابخانه‌ها
// ===========================
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// ===========================
// 📂 وارد کردن مسیرهای ماژول‌ها
// ===========================
// مسیر محصول (Product Module)
import productRoutes from './modules/product/interfaces/routes/productRoutes.js';

// بارگذاری متغیرهای محیطی
dotenv.config();

// ===========================
// 🚀 ایجاد اپلیکیشن Express
// ===========================
const app = express();

// ======================
// 🛡 میدلورهای عمومی پروژه
// ======================
app.use(helmet());             // امن کردن هدرهای HTTP
app.use(cors());               // کنترل دسترسی Cross-Origin
app.use(express.json());       // دریافت بدنه JSON

// =====================
// 💓 روت تست سلامت سرور
// =====================
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'سرور سالم و آماده خدمت است.'
  });
});

// =========================================
// 🛣 افزودن روت‌های ماژول‌ها
// =========================================
app.use('/api/products', productRoutes);

// اینجا می‌توان ماژول‌های دیگر را اضافه کرد:
// app.use('/api/users', userRoutes);
// app.use('/api/orders', orderRoutes);

// ===========================
// ⚡ اتصال به دیتابیس و راه‌اندازی سرور
// ===========================
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/pink-store';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
  });

// ===========================
// 📤 خروجی گرفتن از app (اختیاری)
// ===========================
export default app;
