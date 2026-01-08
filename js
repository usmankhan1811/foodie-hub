// Cart array initialize karo
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Add to cart function
function addToCart(name, price) {
  cart.push({ name, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(name + " added to cart!");
}

// CART PAGE LOGIC
function renderCart() {
  const cartTableBody = document.querySelector("#cartTable tbody");
  const totalAmount = document.getElementById("totalAmount");
  cartTableBody.innerHTML = "";

  if (cart.length === 0) {
    cartTableBody.innerHTML = "<tr><td colspan='3'>Cart is empty</td></tr>";
    totalAmount.innerText = "";
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${item.name}</td>
      <td>Rs ${item.price}</td>
      <td><button onclick="removeItem(${index})">Remove</button></td>
    `;

    cartTableBody.appendChild(row);
  });

  totalAmount.innerText = "Total: Rs " + total;
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// Call renderCart on page load
if (document.querySelector("#cartTable")) {
  renderCart();
}

// ===== CHECKOUT PAGE LOGIC =====
const checkoutForm = document.getElementById("checkoutForm");

if (checkoutForm) {
  checkoutForm.onsubmit = function (e) {
    e.preventDefault();

    const name = document.getElementById("custName").value.trim();
    const address = document.getElementById("address").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const msg = document.getElementById("orderMsg");

    if (name === "" || address === "" || phone === "") {
      msg.innerText = "Please fill all fields";
      msg.style.color = "red";
      return;
    }

    msg.innerText = "Order placed successfully!";
    msg.style.color = "green";

    // Clear cart after order
    localStorage.removeItem("cart");
  };
}
