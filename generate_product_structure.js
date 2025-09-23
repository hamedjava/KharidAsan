import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// مسیر فعلی فایل
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// مسیر پایه برای ساخت فولدرها (همین پوشه‌ی product)
const baseDir = __dirname;

// لیست مسیرها و فایل‌ها
const structure = {
  domain: [
    {
      name: 'ProductEntity.js',
      content:
`// مسیر فایل: src/modules/product/domain/ProductEntity.js
// وظایف: تعریف ساختار انتزاعی موجودیت محصول (Entity) برای انتقال داده بین لایه‌های مختلف

export default class ProductEntity {
  constructor({ id, name, description, price, category, stock, images, createdAt, updatedAt }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.category = category;
    this.stock = stock;
    this.images = images;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
`
    }
  ],
  application: {
    usecases: [
      {
        name: 'CreateProductUseCase.js',
        content:
`// مسیر فایل: src/modules/product/application/usecases/CreateProductUseCase.js
// وظایف: سناریوی ایجاد محصول جدید. تعامل با Repository و تبدیل داده به Entity.

import ProductEntity from '../../domain/ProductEntity.js';

export default class CreateProductUseCase {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(productData) {
    const productEntity = new ProductEntity(productData);
    return await this.productRepository.create(productEntity);
  }
}
`
      }
    ],
    services: [
      {
        name: 'ProductService.js',
        content:
`// مسیر فایل: src/modules/product/application/services/ProductService.js
// وظایف: سرویس‌های مرتبط با محصول (مانند محاسبه قیمت، مدیریت موجودی و ...)

export default class ProductService {
  calculateDiscount(price, percentage) {
    return price - (price * percentage / 100);
  }
}
`
      }
    ]
  },
  infrastructure: {
    models: [
      {
        name: 'ProductModel.js',
        content:
`// مسیر فایل: src/modules/product/infrastructure/models/ProductModel.js
// وظایف: تعریف مدل دیتابیس با فیلدهای کامل برای محصول با استانداردهای لازم.

import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  category: { type: String, required: true, trim: true },
  stock: { type: Number, required: true, min: 0 },
  images: [{ type: String, trim: true }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Product', ProductSchema);
`
      }
    ],
    repositories: [
      {
        name: 'ProductRepository.js',
        content:
`// مسیر فایل: src/modules/product/infrastructure/repositories/ProductRepository.js
// وظایف: تعامل مستقیم با دیتابیس برای عملیات CRUD محصول.

import ProductModel from '../models/ProductModel.js';

export default class ProductRepository {
  async create(productData) {
    return await ProductModel.create(productData);
  }

  async update(id, updates) {
    return await ProductModel.findByIdAndUpdate(id, updates, { new: true });
  }

  async delete(id) {
    return await ProductModel.findByIdAndDelete(id);
  }

  async findById(id) {
    return await ProductModel.findById(id);
  }

  async findAll() {
    return await ProductModel.find();
  }

  async search(query) {
    return await ProductModel.find({ name: new RegExp(query, 'i') });
  }
}
`
      }
    ],
    controllers: [
      {
        name: 'ProductController.js',
        content:
`// مسیر فایل: src/modules/product/infrastructure/controllers/ProductController.js
// وظایف: دریافت درخواست از کلاینت، اعتبارسنجی اولیه و فراخوانی UseCase.

import CreateProductUseCase from '../../application/usecases/CreateProductUseCase.js';
import ProductRepository from '../repositories/ProductRepository.js';

const productRepository = new ProductRepository();

export default {
  async create(req, res) {
    try {
      const useCase = new CreateProductUseCase(productRepository);
      const product = await useCase.execute(req.body);
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};
`
      }
    ],
    routes: [
      {
        name: 'product.routes.js',
        content:
`// مسیر فایل: src/modules/product/infrastructure/routes/product.routes.js
// وظایف: تعریف مسیرهای HTTP مرتبط با محصول.

import { Router } from 'express';
import ProductController from '../controllers/ProductController.js';

const router = Router();

router.post('/', ProductController.create);

export default router;
`
      }
    ]
  },
  rootFiles: [
    { name: 'index.js', content: `// مسیر فایل: src/modules/product/index.js\n// وظایف: ورودی اصلی ماژول محصول و اتصال لایه‌ها.` }
  ]
};

// ایجاد فولدر و فایل
function createStructure() {
  // domain
  makeDir(path.join(baseDir, 'domain'));
  structure.domain.forEach(file => makeFile(path.join(baseDir, 'domain', file.name), file.content));

  // application/usecases + services
  makeDir(path.join(baseDir, 'application', 'usecases'));
  structure.application.usecases.forEach(file => makeFile(path.join(baseDir, 'application', 'usecases', file.name), file.content));

  makeDir(path.join(baseDir, 'application', 'services'));
  structure.application.services.forEach(file => makeFile(path.join(baseDir, 'application', 'services', file.name), file.content));

  // infrastructure
  makeDir(path.join(baseDir, 'infrastructure', 'models'));
  structure.infrastructure.models.forEach(file => makeFile(path.join(baseDir, 'infrastructure', 'models', file.name), file.content));

  makeDir(path.join(baseDir, 'infrastructure', 'repositories'));
  structure.infrastructure.repositories.forEach(file => makeFile(path.join(baseDir, 'infrastructure', 'repositories', file.name), file.content));

  makeDir(path.join(baseDir, 'infrastructure', 'controllers'));
  structure.infrastructure.controllers.forEach(file => makeFile(path.join(baseDir, 'infrastructure', 'controllers', file.name), file.content));

  makeDir(path.join(baseDir, 'infrastructure', 'routes'));
  structure.infrastructure.routes.forEach(file => makeFile(path.join(baseDir, 'infrastructure', 'routes', file.name), file.content));

  // index.js
  structure.rootFiles.forEach(file => makeFile(path.join(baseDir, file.name), file.content));
}

function makeDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log('📁 پوشه ساخته شد:', dirPath);
  }
}

function makeFile(filePath, content) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('📄 فایل ساخته شد:', filePath);
  }
}

createStructure();
