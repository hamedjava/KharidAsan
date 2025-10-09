/**
 * مسیر: seller/domain/entities/seller.entity.js
 * وظایف:
 *  - تعریف اسکیمای منطقی (Entity) فروشنده
 *  - این لایه فقط قوانین دامنه و خصوصیات آبجکت فروشنده را نگه می‌دارد
 */
class Seller {
    constructor({ id, email, mobile, password, otp }) {
      this.id = id;
      this.email = email;
      this.mobile = mobile;
      this.password = password;
      this.otp = otp;
    }
  }
  module.exports = Seller;
  