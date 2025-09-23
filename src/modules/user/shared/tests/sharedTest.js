// مسیر فایل: src/shared/tests/sharedTest.js
// وظیفه: تست عملکرد بخش‌های shared شامل UserModel, OtpService, PasswordService, registerValidation
// این تست به MongoDB وصل شده و عملکرد هر بخش را در ترمینال چاپ می‌کند.

// ===== تنظیمات اولیه =====
import mongoose from 'mongoose';
import User from '../models/UserModel.js';
import OtpService from '../services/OtpService.js';
import PasswordService from '../services/PasswordService.js';
import registerValidation from '../validations/registerValidation.js';

// ===== اتصال به دیتابیس =====
const MONGO_URI = 'mongodb://localhost:27017/kharidAsan_test'; // آدرس دیتابیس تست

async function runTests() {
  try {
    console.log('📡 در حال اتصال به دیتابیس...');
    await mongoose.connect(MONGO_URI);
    console.log('✅ اتصال برقرار شد\n');

    // ===== 1. تست مدل UserModel =====
    console.log('📝 تست ایجاد کاربر...');
    const userData = {
      fullName: 'علی رضایی',
      phoneNumber: '09123456789',
      email: 'ali@example.com',
      password: await PasswordService.hashPassword('123456'),
      role: 'customer',
      address: 'تهران، خیابان آزادی'
    };
    const newUser = await User.create(userData);
    console.log('✅ کاربر ایجاد شد:', newUser);

    // ===== 2. تست OTP =====
    console.log('\n🔑 تست تولید و ذخیره OTP...');
    const otpCode = await OtpService.setOtpForUser('09123456789');
    console.log('✅ OTP تولید شد:', otpCode);

    console.log('📌 تست بررسی OTP صحیح...');
    const otpResultTrue = await OtpService.verifyOtp('09123456789', otpCode);
    console.log('✅ OTP صحیح:', otpResultTrue);

    console.log('📌 تست بررسی OTP اشتباه...');
    try {
      await OtpService.verifyOtp('09123456789', '000000');
    } catch (err) {
      console.log('⚠️ انتظار خطا:', err.message);
    }

    // ===== 3. تست سرویس پسورد =====
    console.log('\n🔐 تست هش و مقایسه پسورد...');
    const hashedPass = await PasswordService.hashPassword('555555');
    console.log('✅ پسورد هش شد:', hashedPass);

    const isMatchTrue = await PasswordService.comparePassword('555555', hashedPass);
    console.log('📌 مقایسه صحیح:', isMatchTrue);

    const isMatchFalse = await PasswordService.comparePassword('wrongpass', hashedPass);
    console.log('📌 مقایسه اشتباه:', isMatchFalse);

    // ===== 4. تست اعتبارسنجی ثبت‌نام =====
    console.log('\n🧪 تست اعتبارسنجی ثبت‌نام...');
    const goodData = {
      fullName: 'حسین احمدی',
      phoneNumber: '09111111111',
      email: 'hossein@example.com',
      password: 'abcdef',
      role: 'seller',
      address: '',
      avatarUrl: ''
    };
    const badData = {
      fullName: 'ح',
      phoneNumber: '0211234567', // شماره غیرمجاز
      email: 'bademail',
      password: '12',
      role: 'seller'
    };

    const validResult = registerValidation.validate(goodData);
    console.log('✅ داده صحیح - خطا:', validResult.error);

    const invalidResult = registerValidation.validate(badData);
    console.log('⚠️ داده اشتباه - خطا:', invalidResult.error?.message);

    // ===== پایان =====
    console.log('\n🎯 همه تست‌ها اجرا شدند.');

  } catch (err) {
    console.error('❌ خطا در تست:', err);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 اتصال دیتابیس بسته شد.');
  }
}

runTests();
