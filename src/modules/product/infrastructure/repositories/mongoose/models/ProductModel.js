// مسیر: src/modules/product/infrastructure/repositories/mongoose/models/ProductModel.js

import mongoose from 'mongoose';

const variantSchema = new mongoose.Schema({
  color: { type: String, default: null },
  size: { type: String, default: null },
  volume: { type: String, default: null },
}, { _id: false });

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  finalPrice: { type: Number },
  brand: { type: String },
  category: { type: String },
  tags: [{ type: String }],
  images: [{ type: String }],
  variants: [variantSchema],
  stock: { type: Number, default: 0 }
}, { timestamps: true });

// محاسبه خودکار finalPrice قبل از ذخیره
productSchema.pre('save', function (next) {
  this.finalPrice = this.price - (this.price * (this.discount / 100));
  next();
});

// مدل را می‌سازیم
const ProductModel = mongoose.model('Product', productSchema);

export default ProductModel;
