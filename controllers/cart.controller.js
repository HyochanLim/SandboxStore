const Product = require("../models/product.model");

function getCart(req, res) {
    res.render("customer/cart/cart", {
        cartItems: res.locals.cart.items,
        totalPrice: res.locals.cart.totalPrice,
    });
}

async function addCartItem(req, res, next) {
    let product;
    try {
        product = await Product.findById(req.body.productId);
    } catch (error) {
        next(error);
        return;
    }

    if (!product) {
        return res.status(404).render("shared/404", {
            isAuth: res.locals.isAuth ?? false,
            isAdmin: res.locals.isAdmin ?? false,
            uid: res.locals.uid ?? null,
            csrfToken: res.locals.csrfToken ?? "",
        });
    }

    const cart = res.locals.cart;
    cart.addItem(product);
    req.session.cart = cart;

    if (req.xhr || (req.headers.accept && req.headers.accept.includes("application/json"))) {
        return res.status(201).json({
            message: "Cart updated!",
            newTotalItems: cart.totalQuantity,
        });
    }

    res.redirect("/cart");
}

function updateCartItem(req, res) {
    const cart = res.locals.cart;
    const newQuantity = +req.body.newQuantity;
    const updateItemData = cart.updateItem(req.body.productId, newQuantity);

    if (!updateItemData) {
        return res.status(404).json({ message: "Cart item not found." });
    }

    req.session.cart = cart;

    res.json({
        message: "Cart updated!",
        updatedCartData: {
            newTotalQuantity: updateItemData.newTotalQuantity,
            newTotalPrice: updateItemData.newTotalPrice,
            updatedItemPrice: updateItemData.updatedItemPrice,
        },
    });
}

module.exports = {
    getCart: getCart,
    addCartItem: addCartItem,
    updateCartItem: updateCartItem,
};