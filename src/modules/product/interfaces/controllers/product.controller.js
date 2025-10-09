const createProductUseCase = require('../../domain/usecases/createProduct.usecase');
const updateProductUseCase = require('../../domain/usecases/updateProduct.usecase');
const deleteProductUseCase = require('../../domain/usecases/deleteProduct.usecase');
const getProductByIdUseCase = require('../../domain/usecases/getProductById.usecase');
const listProductsUseCase = require('../../domain/usecases/listProducts.usecase');

module.exports = {
  /** -------------------- ایجاد محصول -------------------- **/
  async create(req, res) {
    try {
      // استخراج شناسه فروشنده از توکن احراز هویت
      const sellerId = req.seller?.id || req.seller?._id;

      if (!sellerId) {
        return res.status(401).json({
          status: 'error',
          message: 'Seller ID not found. Please login again.'
        });
      }

      // ارسال داده‌ها به UseCase همراه sellerId
      const data = { ...req.body, sellerId };

      // فراخوانی UseCase و دریافت entity محصول
      const result = await createProductUseCase(data, sellerId);

      // اگر UseCase خطا برگرداند
      if (!result || result.status === 'error') {
        return res.status(400).json({
          status: 'error',
          message: result?.message || 'Product creation failed'
        });
      }

      // ✅ UseCase فقط داده محصول را برمی‌گرداند، نه status تودرتو
      const product = result.data || result;

      // پاسخ HTTP نهایی - یک سطح status + data و شامل id
      res.status(201).json({
        status: 'success',
        data: product
      });
    } catch (err) {
      console.error('❌ [ProductController.create] Error:', err.message);
      res.status(500).json({ status: 'error', message: err.message });
    }
  },

  /** -------------------- به‌روزرسانی محصول -------------------- **/
  async update(req, res) {
    try {
      const result = await updateProductUseCase(req.params.id, req.body);

      if (!result) {
        return res.status(404).json({
          status: 'error',
          message: 'Product not found for update'
        });
      }

      res.status(200).json({
        status: 'success',
        data: result.data || result
      });
    } catch (err) {
      console.error('❌ [ProductController.update] Error:', err.message);
      res.status(400).json({ status: 'error', message: err.message });
    }
  },

  /** -------------------- حذف محصول -------------------- **/
  async delete(req, res) {
    try {
      const deleted = await deleteProductUseCase(req.params.id);

      if (!deleted) {
        return res.status(404).json({
          status: 'error',
          message: 'Product not found for deletion'
        });
      }

      res.status(200).json({
        status: 'success',
        message: 'Product deleted successfully'
      });
    } catch (err) {
      console.error('❌ [ProductController.delete] Error:', err.message);
      res.status(400).json({ status: 'error', message: err.message });
    }
  },

  /** -------------------- دریافت محصول با شناسه -------------------- **/
  async getById(req, res) {
    try {
      const product = await getProductByIdUseCase(req.params.id);

      if (!product) {
        return res.status(404).json({
          status: 'error',
          message: 'Product not found'
        });
      }

      res.status(200).json({
        status: 'success',
        data: product.data || product
      });
    } catch (err) {
      console.error('❌ [ProductController.getById] Error:', err.message);
      res.status(404).json({ status: 'error', message: err.message });
    }
  },

  /** -------------------- فهرست محصولات -------------------- **/
  async list(req, res) {
    try {
      const filters = req.query || {};
      const products = await listProductsUseCase(filters);

      res.status(200).json({
        status: 'success',
        data: products.data || products
      });
    } catch (err) {
      console.error('❌ [ProductController.list] Error:', err.message);
      res.status(400).json({ status: 'error', message: err.message });
    }
  },
};
