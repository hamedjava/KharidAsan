import { Router } from 'express';
import MongoProductRepository from '../../infrastructure/database/MongoProductRepository.js';
import CreateProductUseCase from '../../application/usecases/CreateProductUseCase.js';
import GetAllProductsUseCase from '../../application/usecases/GetAllProductsUseCase.js';
import GetProductByIdUseCase from '../../application/usecases/GetProductByIdUseCase.js';
import UpdateProductUseCase from '../../application/usecases/UpdateProductUseCase.js';
import DeleteProductUseCase from '../../application/usecases/DeleteProductUseCase.js';
import ProductController from '../controllers/ProductController.js';

const router = Router();
const repository = new MongoProductRepository();

const controller = new ProductController({
  createProductUseCase: new CreateProductUseCase(repository),
  getAllProductsUseCase: new GetAllProductsUseCase(repository),
  getProductByIdUseCase: new GetProductByIdUseCase(repository),
  updateProductUseCase: new UpdateProductUseCase(repository),
  deleteProductUseCase: new DeleteProductUseCase(repository)
});

router.post('/', controller.create);
router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

export default router;
