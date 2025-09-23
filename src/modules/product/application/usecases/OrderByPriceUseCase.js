// مسیر فایل: src/modules/product/application/usecases/OrderByPriceUseCase.js
// وظایف: مرتب‌سازی محصولات بر اساس قیمت (صعودی یا نزولی) با استفاده از Repository.

export default class OrderByPriceUseCase {
    constructor(productRepository) {
      this.productRepository = productRepository;
    }
  
    async execute(order) {
      return await this.productRepository.orderByPrice(order);
    }
  }
  