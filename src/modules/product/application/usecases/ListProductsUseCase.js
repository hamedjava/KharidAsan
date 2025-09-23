// مسیر فایل: src/modules/product/application/usecases/ListProductsUseCase.js
// وظایف: گرفتن لیست همه محصولات

export default class ListProductsUseCase {
    constructor(productRepository) {
      this.productRepository = productRepository;
    }
  
    async execute() {
      return await this.productRepository.findAll();
    }
  }
  