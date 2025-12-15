// CARRINHO
const cartBtn = document.getElementById("openCart");
const closeCart = document.getElementById("closeCart");
const cart = document.getElementById("cart");
const cartItems = document.getElementById("cart-items");
const totalPrice = document.getElementById("total-price");

let cartData = [];

cartBtn.addEventListener("click", () => cart.classList.add("open"));
closeCart.addEventListener("click", () => cart.classList.remove("open"));

document.querySelectorAll(".add-cart").forEach(btn => {
    btn.addEventListener("click", () => {
        let name = btn.dataset.name;
        let price = parseFloat(btn.dataset.price);
        cartData.push({ name, price });
        renderCart();
    });
});

function renderCart() {
    cartItems.innerHTML = "";
    let total = 0;

    cartData.forEach((item, index) => {
        total += item.price;
        cartItems.innerHTML += `
            <li>
                ${item.name} — R$ ${item.price.toFixed(2)}
                <button onclick="removeItem(${index})">X</button>
            </li>
        `;
    });

    totalPrice.textContent = total.toFixed(2);
}

function removeItem(i) {
    cartData.splice(i, 1);
    renderCart();
}

// PAGAMENTO
const payment = document.getElementById("payment");
const checkout = document.getElementById("checkout-btn");
const closePayment = document.getElementById("closePayment");

checkout.addEventListener("click", () => payment.classList.add("active"));
closePayment.addEventListener("click", () => payment.classList.remove("active"));

document.getElementById("pay-now").addEventListener("click", () => {
    alert("Pagamento concluído! (Simulação)");
    payment.classList.remove("active");
    cartData = [];
    renderCart();
});

// TEMA
const themeBtn = document.querySelector(".theme-toggle");
const html = document.documentElement;

themeBtn.addEventListener("click", () => {
    html.dataset.theme = html.dataset.theme === "dark" ? "light" : "dark";
    themeBtn.textContent = html.dataset.theme === "dark" ? "🌙" : "☀️";
});

// MENU MOBILE
const toggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

toggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
});
