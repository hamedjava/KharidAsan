// مسیر فایل: src/modules/product/application/usecases/DeleteProductUseCase.js
// وظایف: حذف یک محصول توسط ID

export default class DeleteProductUseCase {
    constructor(productRepository) {
      this.productRepository = productRepository;
    }
  
    async execute(productId) {
      return await this.productRepository.delete(productId);
    }
  }
  