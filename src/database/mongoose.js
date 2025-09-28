// import mongoose from 'mongoose';
// import dotenv from 'dotenv';

// dotenv.config();

// const MONGODB_URI = process.env.MONGODB_URI;

// export default async function connectDB() {
//   if (!MONGODB_URI) {
//     throw new Error('❌ MONGODB_URI در فایل .env تعریف نشده است');
//   }

//   try {
//     await mongoose.connect(MONGODB_URI);  // بدون options قدیمی
//     console.log('✅ اتصال به MongoDB برقرار شد.');
//   } catch (error) {
//     console.error('❌ خطا در اتصال به MongoDB:', error);
//     throw error;
//   }
// }
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

export default async function connectDB() {
  if (!MONGODB_URI) {
    throw new Error('❌ MONGODB_URI در فایل .env تعریف نشده است');
  }

  try {
    await mongoose.connect(MONGODB_URI); // آپشن‌های deprecated حذف شدند
    console.log('✅ اتصال به MongoDB برقرار شد.');
  } catch (error) {
    console.error('❌ خطا در اتصال به MongoDB:', error.message);
    throw error;
  }
}

/**
 * 📌 قطع اتصال به پایگاه داده (مثلاً بعد از تست یا خاموش شدن سرور)
 */
export async function disconnectDB() {
  try {
    await mongoose.disconnect();
    console.log('🔌 اتصال به MongoDB قطع شد.');
  } catch (err) {
    console.error('❌ خطا در قطع اتصال به MongoDB:', err.message);
  }
}

// 📌 هندل سیگنال خروج برنامه
process.on('SIGINT', async () => {
  await disconnectDB();
  process.exit(0);
});
