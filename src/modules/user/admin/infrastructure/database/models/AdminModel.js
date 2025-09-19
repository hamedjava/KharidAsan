import mongoose from 'mongoose';
import { BaseUserSchema } from '../../../../shared/infrastructure/database/models/BaseUserModel.js';

const { Schema } = mongoose;

const AdminSchema = new Schema(
  {
    ...BaseUserSchema.obj,
    role: { type: String, default: 'admin', immutable: true },
    permissions: { type: [String], default: [] },
    managedModules: { type: [String], default: [] },
    superAdmin: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export const AdminModel = mongoose.model('Admin', AdminSchema);
