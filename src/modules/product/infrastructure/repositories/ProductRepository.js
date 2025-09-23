// مسیر فایل: src/modules/product/infrastructure/repositories/ProductRepository.js
// وظایف: مدیریت عملیات CRUD و جستجو و مرتب‌سازی روی مدل Product.

import ProductModel from '../models/ProductModel.js';

export default class ProductRepository {
  async create(productData) {
    return await ProductModel.create(productData);
  }

  async update(id, updates) {
    return await ProductModel.findByIdAndUpdate(id, updates, { new: true });
  }

  async delete(id) {
    return await ProductModel.findByIdAndDelete(id);
  }

  async findById(id) {
    return await ProductModel.findById(id);
  }

  async findAll() {
    return await ProductModel.find();
  }

  async search(query) {
    return await ProductModel.find({ name: new RegExp(query, 'i') });
  }

  async orderByPrice(order = 'asc') {
    const sortOrder = order === 'desc' ? -1 : 1;
    return await ProductModel.find().sort({ price: sortOrder });
  }
}
