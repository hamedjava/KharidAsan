// مسیر فایل: seller/domain/entities/Seller.js
// شرح وظایف: این فایل کلاس موجودیت Seller را تعریف می‌کند که نقش مدل سطح دامنه را دارد.
// این کلاس صرفاً ویژگی‌های اصلی یک فروشنده را نگه می‌دارد و هیچ وابستگی به دیتابیس ندارد.

export default class Seller {
    constructor({ username, fullName, email, password, role = 'seller', mobile }) {
      this.username = username;
      this.fullName = fullName;
      this.email = email;
      this.password = password;
      this.role = role;
      this.mobile = mobile;
    }
  }
  