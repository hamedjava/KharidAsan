/**
 * فایل server.js - نقطه شروع اجرای برنامه
 */
import dotenv from 'dotenv';
dotenv.config();

import app from './src/app.js';
import connectDB from './src/database/mongoose.js';

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    console.log('⏳ در حال اتصال به پایگاه داده...');
    await connectDB();
    console.log('✅ اتصال به پایگاه داده با موفقیت برقرار شد.');

    app.listen(PORT, () => {
      console.log(`🚀 سرور با موفقیت روی پورت ${PORT} اجرا شد.`);
    });
  } catch (error) {
    console.error('❌ خطا در راه‌اندازی سرور:', error.message);
    process.exit(1);
  }
}

// هندلینگ خطاهای غیرمنتظره در Promise‌ها یا کل برنامه
process.on('unhandledRejection', reason => {
  console.error('⚠️ خطای Promise مدیریت‌نشده:', reason);
});

process.on('uncaughtException', error => {
  console.error('⚠️ خطای غیرمنتظره در اجرای برنامه:', error);
});

startServer();
