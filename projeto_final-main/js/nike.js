// MENU MOBILE
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
menuToggle && menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
});

// TEMA
const themeBtn = document.querySelector(".theme-toggle");
const html = document.documentElement;
if (themeBtn) {
    themeBtn.addEventListener("click", () => {
        html.dataset.theme = html.dataset.theme === "dark" ? "light" : "dark";
        themeBtn.textContent = html.dataset.theme === "dark" ? "🌙" : "☀️";
    });
}

// CARRINHO
const cartBtn = document.getElementById("openCart");
const closeCartBtn = document.getElementById("closeCart");
const cart = document.getElementById("cart");
const cartItems = document.getElementById("cart-items");
const totalPrice = document.getElementById("total-price");

let cartData = [];

// abrir/fechar
cartBtn && cartBtn.addEventListener("click", () => cart.classList.add("open"));
closeCartBtn && closeCartBtn.addEventListener("click", () => cart.classList.remove("open"));

// adicionar ao carrinho
document.querySelectorAll(".add-cart").forEach(btn => {
    btn.addEventListener("click", () => {
        const name = btn.dataset.name;
        const price = parseFloat(btn.dataset.price);

        cartData.push({ name, price });
        renderCart();
        // abrir carrinho automaticamente para feedback
        cart.classList.add("open");
    });
});

function renderCart() {
    cartItems.innerHTML = "";
    let total = 0;

    cartData.forEach((item, index) => {
        total += item.price;
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${item.name} — R$ ${item.price.toFixed(2)}</span>
            <button onclick="removeItem(${index})">X</button>
        `;
        cartItems.appendChild(li);
    });

    totalPrice.textContent = total.toFixed(2);
}

function removeItem(i) {
    cartData.splice(i, 1);
    renderCart();
}

// Torna removeItem acessível no escopo global (para botão onclick inline)
window.removeItem = removeItem;

// PAGAMENTO
const payment = document.getElementById("payment");
const checkoutBtn = document.getElementById("checkout-btn");
const closePaymentBtn = document.getElementById("closePayment");
const payNow = document.getElementById("pay-now");

checkoutBtn && checkoutBtn.addEventListener("click", () => {
    payment.classList.add("active");
});

closePaymentBtn && closePaymentBtn.addEventListener("click", () => {
    payment.classList.remove("active");
});

payNow && payNow.addEventListener("click", () => {
    alert("Pagamento concluído! (Simulação)");
    payment.classList.remove("active");
    cartData = [];
    renderCart();
    cart.classList.remove("open");
});