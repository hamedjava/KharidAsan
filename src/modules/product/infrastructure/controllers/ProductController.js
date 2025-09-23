// مسیر فایل: src/modules/product/infrastructure/controllers/ProductController.js
// وظایف: مدیریت درخواست‌های HTTP مربوط به محصول و فراخوانی Use Caseهای مرتبط.
// نکته: در این کنترلر، business logic وجود ندارد و فقط مسئول ورودی/خروجی است.

import ProductRepository from '../repositories/ProductRepository.js';

// ایمپورت تمام UseCaseهای CRUD + Search + مرتب‌سازی
import CreateProductUseCase from '../../application/usecases/CreateProductUseCase.js';
import UpdateProductUseCase from '../../application/usecases/UpdateProductUseCase.js';
import DeleteProductUseCase from '../../application/usecases/DeleteProductUseCase.js';
import GetProductByIdUseCase from '../../application/usecases/GetProductByIdUseCase.js';
import ListProductsUseCase from '../../application/usecases/ListProductsUseCase.js';
import SearchProductsUseCase from '../../application/usecases/SearchProductsUseCase.js';
import OrderByPriceUseCase from '../../application/usecases/OrderByPriceUseCase.js';

const productRepository = new ProductRepository();

export default {
  // ایجاد محصول جدید
  async create(req, res) {
    try {
      const useCase = new CreateProductUseCase(productRepository);
      const product = await useCase.execute(req.body);
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // ویرایش محصول
  async update(req, res) {
    try {
      const useCase = new UpdateProductUseCase(productRepository);
      const product = await useCase.execute(req.params.id, req.body);
      res.status(200).json(product);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // حذف محصول
  async delete(req, res) {
    try {
      const useCase = new DeleteProductUseCase(productRepository);
      await useCase.execute(req.params.id);
      res.status(204).send(); // بدون محتوا
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // دریافت محصول با ID
  async getById(req, res) {
    try {
      const useCase = new GetProductByIdUseCase(productRepository);
      const product = await useCase.execute(req.params.id);
      if (!product) {
        return res.status(404).json({ error: 'محصول یافت نشد' });
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },

  // لیست تمام محصولات
  async list(req, res) {
    try {
      const useCase = new ListProductsUseCase(productRepository);
      const products = await useCase.execute();
      res.status(200).json(products);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // جستجوی محصولات بر اساس عبارت
  async search(req, res) {
    try {
      const query = req.query.q || '';
      const useCase = new SearchProductsUseCase(productRepository);
      const products = await useCase.execute(query);
      res.status(200).json(products);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // مرتب‌سازی محصولات بر اساس قیمت (asc یا desc)
  async orderByPrice(req, res) {
    try {
      const order = req.query.order || 'asc'; // پیش‌فرض صعودی
      const useCase = new OrderByPriceUseCase(productRepository);
      const products = await useCase.execute(order);
      res.status(200).json(products);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};
