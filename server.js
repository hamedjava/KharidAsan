// ===========================
// 🔧 بارگذاری متغیرهای محیطی
// ===========================
// این فایل باید در ریشه پروژه باشد و شامل مقادیر حساس مثل PORT، MONGO_URI و JWT_SECRET باشد.
import dotenv from 'dotenv';
dotenv.config(); // مقادیر را وارد process.env می‌کند

// ===========================
// 📦 وارد کردن کتابخانه‌ها
// ===========================
import mongoose from 'mongoose'; // ODM برای اتصال و مدیریت MongoDB
import app from './src/app.js'; // اپلیکیشن Express ما

// ===========================
// ⚙️ خواندن تنظیمات از .env
// ===========================
const PORT = process.env.PORT || 3000; // پورتی که سرور روی آن اجرا می‌شود
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/pink'; // آدرس دیتابیس

// ===========================
// 📡 اتصال به دیتابیس MongoDB
// ===========================
console.log('⏳ تلاش برای اتصال به دیتابیس ...');
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ اتصال به دیتابیس MongoDB با موفقیت برقرار شد.');
    console.log(`📂 نام دیتابیس: ${mongoose.connection.name}`);
    console.log(`🖇️ هاست: ${mongoose.connection.host}`);
    
    // ===========================
    // 🚀 اجرای سرور Express
    // ===========================
    app.listen(PORT, () => {
      console.log(`\n🌐 سرور با موفقیت راه‌اندازی شد`);
      console.log(`📍 آدرس:   http://localhost:${PORT}`);
      console.log(`📈 محیط:  ${process.env.NODE_ENV || 'development'}\n`);
      console.log('💡 برای بررسی سلامت سرور می‌توانید به مسیر /health بروید.');
    });
  })
  .catch((err) => {
    console.error('❌ خطا در اتصال به دیتابیس MongoDB:');
    console.error(`📄 پیام خطا: ${err.message}`);
    console.error('🛠️ لطفاً بررسی کنید که MongoDB در حال اجراست و MONGO_URI صحیح است.');
    process.exit(1); // خروج از برنامه در صورت خطای جدی
  });

// 📌 نکته: گزینه‌های useNewUrlParser و useUnifiedTopology در Mongoose 8 پیش‌فرض فعال هستند و نیازی به افزودن آن‌ها نیست.
