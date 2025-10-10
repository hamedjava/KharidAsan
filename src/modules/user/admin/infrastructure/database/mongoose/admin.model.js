const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobile: { type: String, required: true, unique: true },
    role: { type: String, default: 'admin', lowercase: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Admin', adminSchema);
