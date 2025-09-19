import { BaseUserModel } from '../../../../../../../src/modules/user/shared/infrastructure/database/models/BaseUserModel.js';
import mongoose from 'mongoose';

const CustomerSchema = new mongoose.Schema({
  addresses: [{ type: String }],
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  birthDate: { type: Date },
  gender: { type: String, enum: ['male', 'female', 'other'] },
});

export const CustomerModel = BaseUserModel.discriminator('customer', CustomerSchema);
