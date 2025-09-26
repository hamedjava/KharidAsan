export default class UpdateProduct {
    constructor({ productRepository }) {
      this.productRepository = productRepository;
    }
  
    async execute(productId, updateData) {
      const updatedProduct = await this.productRepository.update(productId, updateData);
      if (!updatedProduct) throw new Error('محصول برای به‌روزرسانی یافت نشد');
      return updatedProduct;
    }
  }
  