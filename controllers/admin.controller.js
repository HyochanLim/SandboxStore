function getProducts(req, res) {
    res.render('admin/products/all-products', {
        pageTitle: 'All Products',
    });
}

function getNewProduct(req, res) {
    res.render('admin/products/new-products', {
        pageTitle: 'Add New Product',
    });
}

function createNewProduct(req, res) {

}


module.exports = {
  getProducts: getProducts,
  getNewProduct: getNewProduct,
  createNewProduct: createNewProduct,
};