// مسیر فایل: src/modules/product/infrastructure/models/ProductModel.js
// وظایف: تعریف مدل دیتابیس محصول با تمام فیلدهای لازم و روابط مورد نیاز.

import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  category: { type: String, required: true, trim: true },
  stock: { type: Number, required: true, min: 0 },
  images: [{ type: String, trim: true }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Product', ProductSchema);
