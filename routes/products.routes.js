const express = require('express');

const productsController = require('../controllers/products.controller');

const getAllProduct = productsController.getAllProducts;
const getProductDetails = productsController.getProductDetails;

const router = express.Router();

router.get('/products', getAllProduct);

router.get('/products/:id', getProductDetails);

module.exports = router;