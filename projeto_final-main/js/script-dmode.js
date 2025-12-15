document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("toggleDark");

  // Função para carregar o tema salvo
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    toggleBtn.textContent = "☀️";
  }

  // Alternar entre modo claro e escuro
  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    // Troca o ícone
    if (document.body.classList.contains("dark")) {
      toggleBtn.textContent = "☀️";
    } else {
      toggleBtn.textContent = "🌙";
    }

    // Salva a preferência no localStorage
    localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
  });

  // Função para remover o fundo branco das imagens de logos
  function removeWhiteBackground(imgElement) {
    const img = imgElement;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

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
        data[i + 3] = 0; // Torna transparente
      }
    }

    ctx.putImageData(imgData, 0, 0);
    img.src = canvas.toDataURL("image/png");
  }

  // Aplica a remoção do fundo branco das imagens de logos
  const logos = document.querySelectorAll(".brand-logo");

  logos.forEach(img => {
    if (img.complete) {
      removeWhiteBackground(img);
    } else {
      img.onload = () => removeWhiteBackground(img);
    }
  });
});
