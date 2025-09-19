import ProductModel from '../../../product/infrastructure/repositories/mongoose/models/ProductModel.js';
import ProductRepository from '../../domain/repositories/ProductRepository.js';

export default class ProductRepositoryMongoDB extends ProductRepository {
  async create(productEntity) {
    const product = new ProductModel(productEntity);
    return await product.save();
  }

  async findAll() {
    return await ProductModel.find();
  }

  async find(query, sortQuery, skip, limit) {
    return await ProductModel.find(query)
      .sort(sortQuery)
      .skip(skip)
      .limit(limit);
  }

  async count(query) {
    return await ProductModel.countDocuments(query);
  }

  async findById(id) {
    return await ProductModel.findById(id);
  }

  async update(id, updateData) {
    return await ProductModel.findByIdAndUpdate(id, updateData, { new: true });
  }

  async delete(id) {
    return await ProductModel.findByIdAndDelete(id);
  }
}
