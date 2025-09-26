// src/database/mongoose.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

export default async function connectDB() {
  if (!MONGODB_URI) {
    throw new Error('❌ MONGODB_URI در فایل .env تعریف نشده است');
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ اتصال به MongoDB برقرار شد.');
  } catch (error) {
    console.error('❌ خطا در اتصال به MongoDB:', error);
    throw error;
  }
}
