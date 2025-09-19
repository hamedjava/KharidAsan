// مسیر فایل: src/modules/product/application/usecases/CreateProductUseCase.js

// توضیح: این کلاس مسئول منطق ساخت یک محصول جدید است.
export default class CreateProductUseCase {
    constructor(productRepository) {
      this.productRepository = productRepository;
    }
  
    async execute(productData) {
      // اعتبارسنجی اولیه — اینجا می‌توانیم از DTO یا Validator استفاده کنیم
      if (!productData.name || !productData.price) {
        throw new Error('نام و قیمت محصول الزامی است');
      }
  
      return await this.productRepository.create(productData);
    }
  }
  