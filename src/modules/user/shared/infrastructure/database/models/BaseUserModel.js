import mongoose from 'mongoose';

const { Schema } = mongoose;

export const BaseUserSchema = new Schema(
  {
    fullName: { type: String, required: true },
    mobile: { type: String, required: true, unique: true },
    email: { type: String, unique: true, sparse: true },
    passwordHash: { type: String },
    role: { type: String, enum: ['customer', 'seller', 'admin'], required: true },
    otpCode: { type: String },
    otpExpiresAt: { type: Date },
    isActive: { type: Boolean, default: true },
    lastLoginAt: { type: Date }
  },
  { timestamps: true }
);

export const BaseUserModel = mongoose.model('BaseUser', BaseUserSchema);
