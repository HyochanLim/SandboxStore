class Cart {
  constructor(items = [], totalQuantity = 0, totalPrice = 0) {
    this.items = items;
    this.totalQuantity = totalQuantity;
    this.totalPrice = totalPrice;
  }

  addItem(product) {
    const cartItem = {
      product: product,
      quantity: 1,
      totalPrice: product.price,
    };

    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      if (item.product && item.product.id === product.id) {
        cartItem.quantity = item.quantity + 1;
        cartItem.totalPrice = item.totalPrice + product.price;
        this.items[i] = cartItem;

        this.totalQuantity++;
        this.totalPrice += product.price;
        return;
      }
    }
    this.items.push(cartItem);
    this.totalQuantity++;
    this.totalPrice += product.price;
  }

  updateItem(productId, newQuantity) {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];

      if (!item.product || item.product.id !== productId) {
        continue;
      }

      if (newQuantity > 0) {
        const quantityChange = newQuantity - item.quantity;
        item.quantity = newQuantity;
        item.totalPrice = item.product.price * newQuantity;

        this.totalQuantity += quantityChange;
        this.totalPrice += item.product.price * quantityChange;

        return {
          newTotalQuantity: this.totalQuantity,
          newTotalPrice: this.totalPrice,
          updatedItemPrice: item.totalPrice,
        };
      }

      this.items.splice(i, 1);
      this.totalQuantity -= item.quantity;
      this.totalPrice -= item.totalPrice;

      return {
        newTotalQuantity: this.totalQuantity,
        newTotalPrice: this.totalPrice,
        updatedItemPrice: 0,
      };
    }

    return null;
  }
}

module.exports = Cart;