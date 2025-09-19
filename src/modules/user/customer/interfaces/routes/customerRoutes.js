import express from 'express';
import { MongoCustomerRepository } from '../../infrastructure/database/MongoCustomerRepository.js';
import { CustomerController } from '../controllers/CustomerController.js';

const router = express.Router();

const customerRepository = new MongoCustomerRepository();
const customerController = new CustomerController(customerRepository);

router.post('/register', (req, res) => customerController.register(req, res));

export default router;
