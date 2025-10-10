const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true },
  mobile: { type: String, unique: true },
  password: { type: String },
  role: { type: String, default: 'customer', lowercase: true },
  otp: {
    code: String,
    expiresAt: Date
  }
}, { timestamps: true });

module.exports = mongoose.model('Customer', customerSchema);
