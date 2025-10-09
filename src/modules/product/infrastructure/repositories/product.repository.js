const ProductModel = require('../../../product/infrastructure/database/mongoose/model/product.model.js');
const ProductEntity = require('../../../product/domain/entities/product.entity.js');

class ProductRepository {
  async create(productData) {
    try {
      const product = new ProductModel(productData);
      const saved = await product.save();

      if (!saved) {
        throw new Error('Product not saved');
      }

      const entity = new ProductEntity(saved.toObject());
      return entity.toObject(); // ✅ خروجی تمیز شامل id به جای _id
    } catch (error) {
      console.error('❌ [ProductRepository.create] Error:', error.message);
      throw error;
    }
  }

  async findById(id) {
    try {
      const product = await ProductModel.findById(id);

      if (!product) {
        return null;
      }

      const entity = new ProductEntity(product.toObject());
      return entity.toObject();
    } catch (error) {
      console.error('❌ [ProductRepository.findById] Error:', error.message);
      throw error;
    }
  }

  async findAll(filters = {}) {
    try {
      const products = await ProductModel.find(filters);

      // ✅ خروجی آرایه‌ای از object تمیز، نه entity کلاس
      return products.map(p => new ProductEntity(p.toObject()).toObject());
    } catch (error) {
      console.error('❌ [ProductRepository.findAll] Error:', error.message);
      throw error;
    }
  }

  async update(id, updates) {
    try {
      const updated = await ProductModel.findByIdAndUpdate(id, updates, { new: true });

      if (!updated) {
        return null;
      }

      const entity = new ProductEntity(updated.toObject());
      return entity.toObject();
    } catch (error) {
      console.error('❌ [ProductRepository.update] Error:', error.message);
      throw error;
    }
  }

  async delete(id) {
    try {
      const deleted = await ProductModel.findByIdAndDelete(id);
      return deleted ? new ProductEntity(deleted.toObject()).toObject() : null;
    } catch (error) {
      console.error('❌ [ProductRepository.delete] Error:', error.message);
      throw error;
    }
  }
}

module.exports = new ProductRepository();
