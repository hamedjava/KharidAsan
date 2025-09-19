// مسیر فایل: src/modules/product/interfaces/controllers/ProductController.js

export default class ProductController {
  constructor({
    createProductUseCase,
    getAllProductsUseCase,
    getProductByIdUseCase,
    updateProductUseCase,
    deleteProductUseCase
  }) {
    this.createProductUseCase = createProductUseCase;
    this.getAllProductsUseCase = getAllProductsUseCase;
    this.getProductByIdUseCase = getProductByIdUseCase;
    this.updateProductUseCase = updateProductUseCase;
    this.deleteProductUseCase = deleteProductUseCase;
  }

  // 🆕 ایجاد محصول جدید
  create = async (req, res) => {
    try {
      const product = await this.createProductUseCase.execute(req.body);
      res.status(201).json({
        success: true,
        message: '✅ محصول با موفقیت ایجاد شد',
        data: product
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: '❌ خطا در ایجاد محصول',
        error: err.message
      });
    }
  };

  // 📜 دریافت لیست محصولات با search & orderBy & pagination
  getAll = async (req, res) => {
    try {
      const { search, orderBy, orderDir, page = 1, limit = 10 } = req.query;

      const params = {
        search: search || null,
        orderBy: orderBy || 'createdAt',
        orderDir: orderDir || 'desc',
        page: parseInt(page, 10),
        limit: parseInt(limit, 10)
      };

      const products = await this.getAllProductsUseCase.execute(params);

      res.status(200).json({
        success: true,
        message: '📦 لیست محصولات با موفقیت دریافت شد',
        ...products // شامل data و meta (صفحه‌بندی)
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: '❌ خطا در دریافت محصولات',
        error: err.message
      });
    }
  };

  // 🔍 دریافت محصول با ID
  getById = async (req, res) => {
    try {
      const product = await this.getProductByIdUseCase.execute(req.params.id);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'محصول یافت نشد'
        });
      }
      res.status(200).json({
        success: true,
        message: '✅ محصول یافت شد',
        data: product
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: '❌ خطا در دریافت محصول',
        error: err.message
      });
    }
  };

  // ✏ بروزرسانی محصول
  update = async (req, res) => {
    try {
      const updatedProduct = await this.updateProductUseCase.execute(req.params.id, req.body);
      if (!updatedProduct) {
        return res.status(404).json({
          success: false,
          message: 'محصول یافت نشد'
        });
      }
      res.status(200).json({
        success: true,
        message: '✅ محصول بروزرسانی شد',
        data: updatedProduct
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: '❌ خطا در بروزرسانی محصول',
        error: err.message
      });
    }
  };

  // 🗑 حذف محصول
  delete = async (req, res) => {
    try {
      const deleted = await this.deleteProductUseCase.execute(req.params.id);
      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: 'محصول یافت نشد'
        });
      }
      res.status(200).json({
        success: true,
        message: '✅ محصول حذف شد'
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: '❌ خطا در حذف محصول',
        error: err.message
      });
    }
  };
}
