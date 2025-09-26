export default class ListProducts {
    constructor({ productRepository }) {
      this.productRepository = productRepository;
    }
  
    async execute(filter = {}, options = {}) {
      // filter: فیلترهای جستجو (مثلاً دسته‌بندی، قیمت و ...)
      // options: صفحه‌بندی، مرتب سازی و ...
      return this.productRepository.find(filter, options);
    }
  }
  