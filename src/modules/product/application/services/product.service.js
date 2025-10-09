const ProductRepository = require('../../infrastructure/repositories/product.repository');
const ProductEntity = require('../../domain/entities/product.entity');

class ProductService {
  /**
   * ایجاد محصول جدید
   * @param {Object} data داده‌های محصول
   * @param {String} sellerId شناسه فروشنده
   * @returns {Promise<ProductEntity>}
   */
  async createProduct(data, sellerId) {
    // اعتبارسنجی ساده اولیه
    if (!data.name || !data.price) {
      throw new Error('Name and price are required');
    }

    data.sellerId = sellerId;
    const productEntity = new ProductEntity(data);

    const savedProduct = await ProductRepository.create(productEntity);
    return savedProduct;
  }

  /**
   * دریافت اطلاعات یک محصول خاص
   * @param {String} id شناسه محصول
   * @returns {Promise<ProductEntity>}
   */
  async getProductById(id) {
    const product = await ProductRepository.findById(id);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }

  /**
   * لیست همه محصولات با فیلتر اختیاری
   * @param {Object} filters فیلترها (دسته، فروشنده، قیمت و ...)
   */
  async listProducts(filters = {}) {
    const products = await ProductRepository.findAll(filters);
    return products;
  }

  /**
   * بروزرسانی محصول
   * @param {String} id شناسه محصول
   * @param {Object} data داده‌های جدید
   */
  async updateProduct(id, data) {
    const updatedProduct = await ProductRepository.update(id, data);
    if (!updatedProduct) {
      throw new Error('Product not found or update failed');
    }
    return updatedProduct;
  }

  /**
   * حذف محصول
   * @param {String} id شناسه محصول
   */
  async deleteProduct(id) {
    const result = await ProductRepository.delete(id);
    if (!result) {
      throw new Error('Product not found or already deleted');
    }
    return { id, message: 'Product deleted successfully' };
  }
}

module.exports = new ProductService();
