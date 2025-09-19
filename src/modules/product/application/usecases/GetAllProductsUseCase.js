export default class GetAllProductsUseCase {
  /**
   * @param {import('../infrastructure/repositories/ProductRepository.js').default} productRepository
   */
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  /**
   * اجرای دریافت محصولات با فیلتر، مرتب‌سازی و صفحه‌بندی
   */
  async execute({
    search = null,
    orderBy = 'createdAt',
    orderDir = 'desc',
    page = 1,
    limit = 10
  } = {}) {
    // ساخت شرط جستجو
    const query = {};
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    // مرتب‌سازی
    const sortQuery = {};
    sortQuery[orderBy] = orderDir === 'asc' ? 1 : -1;

    // محاسبه offset
    const skip = (page - 1) * limit;

    // دریافت داده و تعداد کل به صورت موازی
    const [data, total] = await Promise.all([
      this.productRepository.find(query, sortQuery, skip, limit),
      this.productRepository.count(query)
    ]);

    // خروجی
    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page * limit < total,
        hasPrevPage: page > 1
      }
    };
  }
}
