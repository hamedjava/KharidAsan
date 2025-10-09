const productService = require('../../application/services/product.service');

/**
 * UseCase: بروزرسانی محصول
 * @param {String} id شناسه‌ی محصول
 * @param {Object} data داده‌های جدید برای بروزرسانی
 */
async function updateProductUseCase(id, data) {
  try {
    const product = await productService.updateProduct(id, data);
    return { status: 'success', data: product };
  } catch (error) {
    console.error('❌ Error in updateProductUseCase:', error.message);
    return { status: 'error', message: error.message };
  }
}

module.exports = updateProductUseCase;
