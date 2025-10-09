const productService = require('../../application/services/product.service');

/**
 * UseCase: حذف محصول
 * @param {String} id شناسه‌ی محصول
 */
async function deleteProductUseCase(id) {
  try {
    const result = await productService.deleteProduct(id);
    return { status: 'success', data: result };
  } catch (error) {
    console.error('❌ Error in deleteProductUseCase:', error.message);
    return { status: 'error', message: error.message };
  }
}

module.exports = deleteProductUseCase;
