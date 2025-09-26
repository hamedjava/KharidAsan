import express from 'express';

// 📌 UseCases
import ListProducts from '../../../product/application/usecases/ListProducts.js';
import GetProductById from '../../../product/application/usecases/GetProductById.js';
import CreateProduct from '../../../product/application/usecases/CreateProduct.js';
import UpdateProduct from '../../../product/application/usecases/UpdateProduct.js';
import DeleteProduct from '../../../product/application/usecases/DeleteProduct.js';

// 📌 Repository
import ProductRepositoryImpl from '../../../../modules/product/infrastructure/repositories/ProductRepositoryImpl.js';

const router = express.Router();
const productRepository = new ProductRepositoryImpl();

/**
 * 📄 لیست محصولات
 */
router.get('/', async (req, res) => {
  try {
    const useCase = new ListProducts({ productRepository });
    const products = await useCase.execute();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error listing products:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * 🔍 دریافت محصول با شناسه
 */
router.get('/:id', async (req, res) => {
  try {
    const useCase = new GetProductById({ productRepository });
    const product = await useCase.execute(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    console.error('Error getting product by ID:', error);
    res.status(404).json({ error: error.message });
  }
});

/**
 * ✅ ایجاد محصول جدید
 */
router.post('/', async (req, res) => {
  try {
    const useCase = new CreateProduct({ productRepository });
    const createdProduct = await useCase.execute(req.body);
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(400).json({ error: error.message });
  }
});

/**
 * ✏️ به‌روزرسانی محصول
 */
router.put('/:id', async (req, res) => {
  try {
    const useCase = new UpdateProduct({ productRepository });
    const updated = await useCase.execute(req.params.id, req.body);
    res.status(200).json(updated);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(404).json({ error: error.message });
  }
});

/**
 * 🗑 حذف محصول
 */
router.delete('/:id', async (req, res) => {
  try {
    const useCase = new DeleteProduct({ productRepository });
    await useCase.execute(req.params.id);
    res.status(200).json({ message: 'محصول با موفقیت حذف شد' }); // مطابق انتظار تست
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(404).json({ error: error.message });
  }
});

export default router;
