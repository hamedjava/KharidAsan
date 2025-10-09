const express = require('express');
const router = express.Router();
const productController = require('../../../product/interfaces/controllers/product.controller.js');
const sellerAuth = require('../../../user/seller/interfaces/middlewares/sellerAuth.middleware.js');

router.post('/', sellerAuth, productController.create);
router.put('/:id', sellerAuth, productController.update);
router.delete('/:id', sellerAuth, productController.delete);
router.get('/:id', productController.getById);
router.get('/', productController.list);

module.exports = router;
