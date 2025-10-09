const ProductService = require('../../application/services/product.service');

async function createProductUseCase(data, sellerId) {
  try {
    const product = await ProductService.createProduct(data, sellerId);

    if (!product) {
      return { status: 'error', message: 'Product not created' };
    }

    // ✅ نه data.status، فقط data خود را برمی‌گردانیم.
    return { status: 'success', data: product };
  } catch (error) {
    console.error('❌ createProductUseCase error:', error.message);
    return { status: 'error', message: error.message };
  }
}

module.exports = createProductUseCase;
