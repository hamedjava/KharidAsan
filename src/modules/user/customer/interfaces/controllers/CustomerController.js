import { RegisterCustomerUseCase } from '../../../../../../src/modules/user/customer/application/use-cases/RegisterCustomerUseCase.js';

export class CustomerController {
  constructor(customerRepository) {
    this.customerRepository = customerRepository;
  }

  async register(req, res) {
    try {
      const useCase = new RegisterCustomerUseCase(this.customerRepository);
      const customer = await useCase.execute(req.body);
      res.status(201).json(customer);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}
