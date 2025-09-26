// src/modules/product/application/usecases/CreateProduct.js

/**
 * ✅ UseCase: ایجاد محصول جدید
 * این کلاس منطق ایجاد محصول را اجرا می‌کند، شامل اعتبارسنجی و فراخوانی Repository
 */
export default class CreateProduct {
    constructor({ productRepository }) {
      if (!productRepository) {
        throw new Error('ProductRepository مقداردهی نشده است');
      }
      this.productRepository = productRepository;
    }
  
    /**
     * @param {Object} productData - داده‌های محصول
     * @returns {Promise<Object>} محصول ایجاد شده
     */
    async execute(productData) {
      try {
        // 🛡 اعتبارسنجی اولیه داده‌ها
        this.validate(productData);
  
        // 🗄 ثبت محصول در پایگاه داده
        const createdProduct = await this.productRepository.create(productData);
  
        return createdProduct;
      } catch (error) {
        // خطا را مجدد پرتاب می‌کنیم تا کنترلر بتواند مدیریت کند
        throw new Error(error.message);
      }
    }
  
    /**
     * 🔍 اعتبارسنجی ورودی‌ها
     * @param {Object} data
     */
    validate(data) {
      if (!data) {
        throw new Error('داده‌های محصول ارسال نشده‌اند');
      }
  
      const { name, price, category, description } = data;
  
      if (!name || typeof name !== 'string' || name.trim().length < 2) {
        throw new Error('نام محصول معتبر نیست');
      }
  
      if (!price || isNaN(price) || Number(price) <= 0) {
        throw new Error('قیمت محصول باید عددی بزرگ‌تر از صفر باشد');
      }
  
      if (!category || typeof category !== 'string' || category.trim().length === 0) {
        throw new Error('دسته‌بندی محصول معتبر نیست');
      }
  
      if (description && typeof description !== 'string') {
        throw new Error('توضیحات محصول باید متن باشد');
      }
    }
  }
  