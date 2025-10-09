const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    category: { type: String, default: '' },
    images: [{ type: String }],
    sellerId: { type: mongoose.Types.ObjectId, ref: 'Seller', required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
