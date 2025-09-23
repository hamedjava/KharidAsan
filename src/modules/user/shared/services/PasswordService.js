// مسیر فایل: src/shared/services/PasswordService.js
// وظیفه: مدیریت هش کردن پسورد و بررسی آن.
// استفاده در ثبت‌نام و ورود با ایمیل/پسورد.

import bcrypt from 'bcrypt';

class PasswordService {
  static async hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  static async comparePassword(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
  }
}

export default PasswordService;
