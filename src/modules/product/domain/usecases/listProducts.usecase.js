const productService = require('../../application/services/product.service');

/**
 * UseCase: نمایش لیست محصولات با اعمال فیلتر اختیاری
 * @param {Object} filters شامل فیلترهایی مثل category، price، sellerId
 */
async function listProductsUseCase(filters = {}) {
  try {
    const products = await productService.listProducts(filters);
    return { status: 'success', data: products };
  } catch (error) {
    console.error('❌ Error in listProductsUseCase:', error.message);
    return { status: 'error', message: error.message };
  }
}

module.exports = listProductsUseCase;
