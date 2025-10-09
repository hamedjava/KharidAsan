const productService = require('../../application/services/product.service');

/**
 * UseCase: دریافت اطلاعات محصول خاص از طریق ID
 * @param {String} id شناسه محصول
 */
async function getProductByIdUseCase(id) {
  try {
    const product = await productService.getProductById(id);
    return { status: 'success', data: product };
  } catch (error) {
    console.error('❌ Error in getProductByIdUseCase:', error.message);
    return { status: 'error', message: error.message };
  }
}

module.exports = getProductByIdUseCase;
