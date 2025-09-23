// مسیر فایل: src/modules/product/application/usecases/CreateProductUseCase.js
// وظایف: سناریوی ایجاد محصول جدید. تعامل با Repository و تبدیل داده به Entity.

import ProductEntity from '../../domain/ProductEntity.js';

export default class CreateProductUseCase {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(productData) {
    const productEntity = new ProductEntity(productData);
    return await this.productRepository.create(productEntity);
  }
}
