import mongoose from 'mongoose';
import { BaseUserSchema } from '../../../../shared/infrastructure/database/models/BaseUserModel.js';

const { Schema } = mongoose;

// اسکیما Admin شامل فیلدهای BaseUser به علاوه فیلدهای اختصاصی
const AdminSchema = new Schema(
  {
    ...BaseUserSchema.obj, // اضافه کردن همه فیلدهای base
    role: { type: String, default: 'admin', immutable: true },
    permissions: {
      type: [String],
      default: [], // مثال: ['manage_users', 'manage_products']
    },
    managedModules: {
      type: [String],
      default: [], // مثال: ['users', 'orders', 'reports']
    },
    superAdmin: {
      type: Boolean,
      default: false // اگر true باشه یعنی دسترسی کامل دارد
    }
  },
  { timestamps: true }
);

export const AdminModel = mongoose.model('Admin', AdminSchema);
