import { UserRepository } from '../../../../../../src/modules/user/shared/domain/repositories/UserRepository.js';
import { SellerModel } from './models/SellerModel.js';

export class MongoSellerRepository extends UserRepository {
  async create(userData) {
    return await SellerModel.create(userData);
  }

  async findById(id) {
    return await SellerModel.findById(id);
  }

  async findByMobile(mobile) {
    return await SellerModel.findOne({ mobile });
  }

  async findByEmail(email) {
    return await SellerModel.findOne({ email });
  }

  async update(id, updateData) {
    return await SellerModel.findByIdAndUpdate(id, updateData, { new: true });
  }

  async delete(id) {
    return await SellerModel.findByIdAndDelete(id);
  }
}
