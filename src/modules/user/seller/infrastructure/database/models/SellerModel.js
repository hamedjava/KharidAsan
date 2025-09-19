import { BaseUserModel } from '../../../../../../../src/modules/user/shared/infrastructure/database/models/BaseUserModel.js';
import mongoose from 'mongoose';

const SellerSchema = new mongoose.Schema({
  shopName: { type: String, required: true },
  shopDescription: { type: String },
  shopLogo: { type: String },
  businessLicenseNumber: { type: String, required: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  ratings: [{ type: Number }],
  bankAccount: { type: String },
});

export const SellerModel = BaseUserModel.discriminator('seller', SellerSchema);
