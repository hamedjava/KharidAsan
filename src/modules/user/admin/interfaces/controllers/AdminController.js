import { RegisterAdminUseCase } from '../../application/usecases/RegisterAdminUseCase.js';

export class AdminController {
  constructor(adminRepository) {
    this.adminRepository = adminRepository;
  }

  async register(req, res) {
    try {
      const useCase = new RegisterAdminUseCase(this.adminRepository);
      const admin = await useCase.execute(req.body);
      res.status(201).json(admin);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}
