export default class GetProductById {
    constructor({ productRepository }) {
      this.productRepository = productRepository;
    }
  
    async execute(productId) {
      const product = await this.productRepository.findById(productId);
      if (!product) throw new Error('محصول یافت نشد');
      return product;
    }
  }
  