/**
 * مسیر فایل: src/modules/product/application/services/ProductService.js
 * وظیفه: سرویس اصلی برای کار با محصولات، ترکیب Usecaseها و Repository
 * - اینجا منطق سطح کاربردی نوشته می‌شود
 */

export default class ProductService {
    constructor(repository) {
        this.repository = repository;
    }

    async create(productData) {
        return await this.repository.create(productData);
    }

    async update(id, productData) {
        return await this.repository.update(id, productData);
    }

    async delete(id) {
        return await this.repository.delete(id);
    }

    async getById(id) {
        return await this.repository.findById(id);
    }

    async list(filters) {
        return await this.repository.findAll(filters);
    }
}
