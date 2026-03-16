const Product = require("../models/product.model");

async function getAllProduct(req, res, next) {
    try {
        const products = await Product.findAll();
        res.render('customer/products/all-products', { products: products });
    } catch (error) {
        next(error);
        return;
    }
}

module.exports = {
    getAllProduct: getAllProduct,
};
