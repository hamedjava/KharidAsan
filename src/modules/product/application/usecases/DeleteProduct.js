export default class DeleteProduct {
    constructor({ productRepository }) {
      this.productRepository = productRepository;
    }
  
    async execute(productId) {
      const deleted = await this.productRepository.delete(productId);
      if (!deleted) throw new Error('محصول برای حذف یافت نشد');
      return deleted;
    }
  }
  