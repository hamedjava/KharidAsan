// src/modules/product/infrastructure/repositories/ProductRepositoryImpl.js
import ProductModel from '../models/ProductModel.js';

export default class ProductRepositoryImpl {
  /**
   * 📄 جستجو و لیست محصولات
   */
  async find(filter = {}, options = {}) {
    try {
      return await ProductModel.find(filter, null, options);
    } catch (err) {
      throw new Error(`خطا در لیست محصولات: ${err.message}`);
    }
  }

  /**
   * 🔍 جستجو محصول با شناسه
   */
  async findById(productId) {
    try {
      return await ProductModel.findById(productId);
    } catch (err) {
      throw new Error(`خطا در دریافت محصول: ${err.message}`);
    }
  }

  /**
   * ✅ ایجاد محصول جدید
   */
  async create(productData) {
    try {
      const product = new ProductModel(productData);
      return await product.save();
    } catch (err) {
      throw new Error(`خطا در ایجاد محصول: ${err.message}`);
    }
  }

  /**
   * ✏️ بروزرسانی محصول
   */
  async update(productId, updateData) {
    try {
      return await ProductModel.findByIdAndUpdate(productId, updateData, { new: true });
    } catch (err) {
      throw new Error(`خطا در بروزرسانی محصول: ${err.message}`);
    }
  }

  /**
   * 🗑 حذف محصول
   */
  async delete(productId) {
    try {
      return await ProductModel.findByIdAndDelete(productId);
    } catch (err) {
      throw new Error(`خطا در حذف محصول: ${err.message}`);
    }
  }
}
