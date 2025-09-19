import { RegisterSellerUseCase } from '../../application/usecases/RegisterSellerUseCase.js';

export class SellerController {
  constructor(sellerRepository) {
    this.sellerRepository = sellerRepository;
  }

  // POST /api/sellers/register
  async register(req, res) {
    try {
      const useCase = new RegisterSellerUseCase(this.sellerRepository);
      const seller = await useCase.execute(req.body);
      res.status(201).json(seller);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}
