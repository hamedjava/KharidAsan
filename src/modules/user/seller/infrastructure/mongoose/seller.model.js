// seller/infrastructure/database/mongoose/seller.model.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const sellerSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    otp: { type: String, default: null },
    role: { type: String, default: 'seller', lowercase: true },
    shopName: { type: String },
    ownerName: { type: String },
  },
  { timestamps: true }
);

sellerSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

sellerSchema.methods.comparePassword = async function (entered) {
  return bcrypt.compare(entered, this.password);
};

module.exports = mongoose.model('Seller', sellerSchema);
