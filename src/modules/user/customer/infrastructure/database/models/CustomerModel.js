import mongoose from 'mongoose';
import { BaseUserSchema } from '../../../../shared/infrastructure/database/models/BaseUserModel.js';

const { Schema } = mongoose;

const CustomerSchema = new Schema(
  {
    ...BaseUserSchema.obj,
    role: { type: String, default: 'customer', immutable: true, required: true },
    addresses: {
      type: [{
        street: { type: String, required: true },
        city: { type: String, required: true },
        province: { type: String, required: true },
        postalCode: { type: String, required: true }
      }],
      default: []
    },
    wishlist: { type: [Schema.Types.ObjectId], ref: 'Product', default: [] },
    birthDate: { type: Date },
    gender: { type: String, enum: ['male', 'female', 'other'] }
  },
  { timestamps: true }
);

export const CustomerModel = mongoose.model('Customer', CustomerSchema);
