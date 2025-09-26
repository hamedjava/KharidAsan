/**
 * مسیر فایل: src/modules/product/interface/controllers/ProductController.js
 * وظیفه: مقطع ارتباط با API، فراخوانی Usecaseها و مدیریت پاسخ‌دهی
 */

export default class ProductController {
    constructor({ createProduct, updateProduct, deleteProduct, getProductById, listProducts }) {
        this.createProduct = createProduct;
        this.updateProduct = updateProduct;
        this.deleteProduct = deleteProduct;
        this.getProductById = getProductById;
        this.listProducts = listProducts;
    }

    create = async (req, res) => {
        try {
            const result = await this.createProduct.execute(req.body);
            res.status(201).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    update = async (req, res) => {
        try {
            const result = await this.updateProduct.execute(req.params.id, req.body);
            res.json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    delete = async (req, res) => {
        try {
            const result = await this.deleteProduct.execute(req.params.id);
            res.json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    getById = async (req, res) => {
        try {
            const result = await this.getProductById.execute(req.params.id);
            res.json(result);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    };

    list = async (req, res) => {
        try {
            const result = await this.listProducts.execute(req.query);
            res.json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };
}
