// Função para lidar com imagens de logo (fundo transparente)
function removeWhiteBackground(imgElement) {
    const img = imgElement;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    ctx.drawImage(img, 0, 0);

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;

    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Se o pixel é branco ou quase branco
        if (r > 240 && g > 240 && b > 240) {
            data[i + 3] = 0; // torna transparente
        }
    }

    ctx.putImageData(imgData, 0, 0);

    // Substitui a imagem pelo canvas com fundo transparente
    img.src = canvas.toDataURL('image/png');
}

// Inicialização dos scripts quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", () => {
    // Lógica para limpar fundo dos logos
    const logos = document.querySelectorAll('.brand-logo');
    logos.forEach(img => {
        if (img.complete) {
            removeWhiteBackground(img);
        } else {
            img.onload = () => removeWhiteBackground(img);
        }
    });

    // --- LÓGICA DO MODO ESCURO (DARK MODE) ---
    const btnDark = document.getElementById("toggleDark");

    if (btnDark) { 
        btnDark.addEventListener("click", () => {
            document.body.classList.toggle("dark");

            if (document.body.classList.contains("dark")) {
                btnDark.textContent = "☀️";
            } else {
                btnDark.textContent = "🌙";
            }

            localStorage.setItem("theme",
                document.body.classList.contains("dark") ? "dark" : "light"
            );
        });

        if (localStorage.getItem("theme") === "dark") {
            document.body.classList.add("dark");
            btnDark.textContent = "☀️";
        }
    }

    // --- LÓGICA DO MENU HAMBURGER ---
    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");

    if (menuToggle && mainNav) {
        menuToggle.addEventListener("click", () => {
            mainNav.classList.toggle("open");
            // Adiciona/Remove atributo aria-expanded para acessibilidade
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
            menuToggle.setAttribute('aria-expanded', !isExpanded);
        });
        
        // Adiciona um evento para fechar o menu se um link for clicado (útil em mobile)
        mainNav.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('open')) {
                    mainNav.classList.remove('open');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }

    // Nota: A lógica de filtro de produtos foi simplificada no HTML/CSS, 
    // mas o script original para cards injetados (se houver) deve ser mantido aqui.
});