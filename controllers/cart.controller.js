const Product = require("../models/product.model");

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

function getCart(req, res) {
    res.render("customer/cart/cart", {
        cartItems: res.locals.cart.items,
        totalPrice: res.locals.cart.totalPrice,
    });
}

module.exports = {
    getCart: getCart,
    addCartItem: addCartItem,
};