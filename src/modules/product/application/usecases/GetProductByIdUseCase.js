// مسیر فایل: src/modules/product/application/usecases/GetProductByIdUseCase.js
// وظایف: گرفتن یک محصول بر اساس ID

export default class GetProductByIdUseCase {
    constructor(productRepository) {
      this.productRepository = productRepository;
    }
  
    async execute(productId) {
      return await this.productRepository.findById(productId);
    }
  }
  