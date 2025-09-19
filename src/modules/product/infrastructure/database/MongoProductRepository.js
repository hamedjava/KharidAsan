import mongoose from 'mongoose';
import ProductRepository from '../../domain/repositories/ProductRepository.js';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  finalPrice: Number,
  category: String,
  brand: String,
  tags: [String],
  images: [String],
  variants: {
    color: [String],
    size: [String],
    volume: [String],
    other: Object
  },
  stock: Number
}, { timestamps: true });

productSchema.pre('save', function (next) {
  this.finalPrice = this.discount > 0
    ? this.price - (this.price * (this.discount / 100))
    : this.price;
  next();
});

const ProductModel = mongoose.model('Product', productSchema);

export default class MongoProductRepository extends ProductRepository {
  async create(productData) {
    const product = new ProductModel(productData);
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
  async update(id, data) {
    return await ProductModel.findByIdAndUpdate(id, data, { new: true });
  }
  async delete(id) {
    return await ProductModel.findByIdAndDelete(id);
  }
}
