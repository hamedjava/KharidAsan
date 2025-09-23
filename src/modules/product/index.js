// مسیر فایل: src/modules/product/index.js
// وظایف: نقطه ورود اصلی به ماژول محصول
// - مدیریت وابستگی‌ها (Dependency Injection)
// - اتصال مسیرها به اپلیکیشن اصلی
// - آماده‌سازی Repository و سایر سرویس‌های مرتبط
// نکته: این فایل باید ساده ولی توسعه‌پذیر باشد تا در آینده 
// بتوان ماژول Product را بدون تغییرات گسترده به سیستم اضافه یا حذف کرد.

import productRoutes from './infrastructure/routes/product.routes.js';
import ProductRepository from './infrastructure/repositories/ProductRepository.js';

// ایجاد نمونه Repository مشترک برای استفاده در UseCaseها
const productRepository = new ProductRepository();

/**
 * تابع ثبت ماژول Product در برنامه اصلی Express
 * @param {Express.Application} app - شیء اپلیکیشن express
 */
function registerProductModule(app) {
  app.use('/api/products', productRoutes);
}


// خروجی ماژول؛ می‌توان repository و سایر اشیا را نیز صادر کرد.
export default {
  registerProductModule,
  repository: productRepository
};
