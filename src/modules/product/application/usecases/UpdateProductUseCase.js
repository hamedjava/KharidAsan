// مسیر فایل: src/modules/product/application/usecases/UpdateProductUseCase.js
// وظایف: سناریوی به‌روزرسانی محصول موجود توسط ID

export default class UpdateProductUseCase {
    constructor(productRepository) {
      this.productRepository = productRepository;
    }
  
    async execute(productId, updates) {
      return await this.productRepository.update(productId, updates);
    }
  }
  