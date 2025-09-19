import express from 'express';
import { MongoAdminRepository } from '../../infrastructure/database/MongoAdminRepository.js';
import { AdminController } from '../controllers/AdminController.js';

const router = express.Router();

const adminRepository = new MongoAdminRepository();
const adminController = new AdminController(adminRepository);

router.post('/register', (req, res) => adminController.register(req, res));

export default router;
