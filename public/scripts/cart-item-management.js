const cartItemUpdateFormElements = document.querySelectorAll(
  ".cart-item-management"
);
const cartTotalPriceElement = document.getElementById("cart-total-price");
const cartBadgeElement = document.querySelector(".nav-items .badge");

async function updateCartItem(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const productId = form.dataset.productid;
  const csrfToken = form.dataset.csrf;
  const quantityInputElement = form.querySelector("input[type='number']");
  const newQuantity = +quantityInputElement.value;

  let response;
  try {
    response = await fetch("/cart/items", {
      method: "PATCH",
      body: JSON.stringify({
        productId: productId,
        newQuantity: newQuantity,
        _csrf: csrfToken,
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
  } catch (error) {
    alert("Failed to update cart item. Please try again.");
    return;
  }

  if (!response.ok) {
    alert("Failed to update cart item. Please try again.");
    return;
  }

  const responseData = await response.json();
  if (responseData.updatedCartData.updateCartItemPrice === 0) {
    form.parentElement.parentElement.remove();
  }
  const updatedCartData = responseData.updatedCartData;

  if (newQuantity <= 0) {
    const cartItemElement = form.closest("li");
    if (cartItemElement) {
      cartItemElement.remove();
    }
  } else {
    const cartItemTotalPriceElement = form
      .closest(".cart-item")
      .querySelector(".cart-item-total-price");

    if (cartItemTotalPriceElement) {
      cartItemTotalPriceElement.textContent = Number(
        updatedCartData.updatedItemPrice
      ).toFixed(2);
    }
  }

  if (cartTotalPriceElement) {
    cartTotalPriceElement.textContent = Number(
      updatedCartData.newTotalPrice
    ).toFixed(2);
  }

  if (cartBadgeElement) {
    cartBadgeElement.textContent = updatedCartData.newTotalQuantity;
  }
}

for (const formElement of cartItemUpdateFormElements) {
  formElement.addEventListener("submit", updateCartItem);
}
