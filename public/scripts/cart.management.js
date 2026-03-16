const addToCartButtonElement = document.querySelector(
  "#product-details button",
);
const cartBadgeElement = document.querySelector(".nav-items .badge");

async function addToCart(event) {
  event.preventDefault();
  const productId = addToCartButtonElement.dataset.productid;
  const csrfToken = addToCartButtonElement.dataset.csrf;

  const response = await fetch("/cart/items", {
    method: "POST",
    body: JSON.stringify({
        productId: productId,
        _csrf: csrfToken,
        }),
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
  });

  if (!response.ok) {
    alert("Failed to add item to cart. Please try again.");
    return;
  }

  const responseData = await response.json();
  const newTotalQuantity = responseData.newTotalItems;

  cartBadgeElement.textContent = newTotalQuantity;
}

addToCartButtonElement.addEventListener("click", addToCart);
