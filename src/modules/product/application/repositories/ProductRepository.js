/**
 * مسیر فایل: src/modules/product/application/repositories/ProductRepository.js
 * وظیفه: تعریف واسط (Interface) برای مخزن محصولات
 * - زیرساخت واقعی (Mongo یا ...) باید این interface را پیاده کند
 */

export default class ProductRepository {
    async create(product) { throw new Error('Method not implemented'); }
    async update(id, product) { throw new Error('Method not implemented'); }
    async delete(id) { throw new Error('Method not implemented'); }
    async findById(id) { throw new Error('Method not implemented'); }
    async findAll(filters = {}) { throw new Error('Method not implemented'); }
}
