export default class UpdateProductUseCase {
    constructor(productRepository) {
      this.productRepository = productRepository;
    }
    async execute(id, data) {
      return await this.productRepository.update(id, data);
    }
  }
  