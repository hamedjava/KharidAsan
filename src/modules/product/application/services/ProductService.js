// مسیر فایل: src/modules/product/application/services/ProductService.js
// وظایف: سرویس‌های مرتبط با محصول (مانند محاسبه قیمت، مدیریت موجودی و ...)

export default class ProductService {
  calculateDiscount(price, percentage) {
    return price - (price * percentage / 100);
  }
}
