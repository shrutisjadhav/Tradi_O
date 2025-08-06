// Navbar cart update, used on ALL pages
function updateNavCart() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let count = cart.reduce((acc, item) => acc + item.quantity, 0);
  let subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  let navCartSpan = document.querySelector('.navCart h4 span');
  let navCartSubtotal = document.getElementById('cartSubtotal');
  if (navCartSpan) navCartSpan.textContent = `(${count})`;
  if (navCartSubtotal) navCartSubtotal.textContent = `₹${subtotal}`;
}
document.addEventListener('DOMContentLoaded', updateNavCart);
window.addEventListener('storage', updateNavCart);

// Cart page logic (only runs on cart.html)
function renderCart() {
  const cartList = document.getElementById('cartList');
  const cartTotal = document.getElementById('cartTotal');
  if (!cartList || !cartTotal) return; // Only run on cart.html

  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (!cart.length) {
    cartList.innerHTML = `<div class="empty-cart">Your cart is empty.</div>`;
    cartTotal.textContent = "";
    document.getElementById('checkoutBtn').disabled = true;
    updateNavCart();
    return;
  }
  document.getElementById('checkoutBtn').disabled = false;
  let total = 0;
  cartList.innerHTML = '';
  cart.forEach(item => {
    total += item.price * item.quantity;
    const itemDiv = document.createElement('div');
    itemDiv.className = 'cart-item';
    itemDiv.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="item-info">
        <div class="item-name">${item.name}</div>
        <div class="item-price">₹${item.price * item.quantity}</div>
        <div class="quantity-controls">
          <button onclick="changeQty(${item.id}, -1)">-</button>
          <span>${item.quantity}</span>
          <button onclick="changeQty(${item.id}, 1)">+</button>
        </div>
      </div>
    `;
    cartList.appendChild(itemDiv);
  });
  cartTotal.textContent = `Total: ₹${total}`;
  updateNavCart();
}

function changeQty(id, delta) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const idx = cart.findIndex(item => item.id === id);
  if (idx !== -1) {
    cart[idx].quantity += delta;
    if (cart[idx].quantity < 1) cart.splice(idx, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
  }
}

document.addEventListener('DOMContentLoaded', function() {
  if (document.getElementById('cartList')) {
    renderCart();
    document.getElementById('checkoutBtn').onclick = function() {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      if (!cart.length) return;
      let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      alert(`Thank you for shopping!\nYour total is ₹${total}.\n(This is a demo checkout.)`);
      // Uncomment below to clear cart after checkout:
      // localStorage.removeItem('cart');
      // renderCart();
    };
  }
});