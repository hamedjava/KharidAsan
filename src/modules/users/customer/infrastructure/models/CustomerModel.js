import mongoose from 'mongoose';

const CustomerSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobile: { type: String, required: true, unique: true },

  otpCode: { type: String },
  otpExpire: { type: Date },
  isOtpVerified: { type: Boolean, default: false },

  email: { type: String, unique: true, sparse: true },
  fullName: { type: String },

}, { timestamps: true });

const CustomerModel = mongoose.model('Customer', CustomerSchema);

export default CustomerModel;
