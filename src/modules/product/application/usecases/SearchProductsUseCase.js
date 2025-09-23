// مسیر فایل: src/modules/product/application/usecases/SearchProductsUseCase.js
// وظایف: جستجوی محصولات بر اساس متن

export default class SearchProductsUseCase {
    constructor(productRepository) {
      this.productRepository = productRepository;
    }
  
    async execute(query) {
      return await this.productRepository.search(query);
    }
  }
  