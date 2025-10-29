const menuHambur = document.querySelector(".toggle-btn");
const toggler = document.querySelector("#icono");

menuHambur.addEventListener("click", function () {
  document.querySelector("#sidebar").classList.toggle("expand");
  toggler.classList.toggle("fa-chevron-right");
  toggler.classList.toggle("fa-chevron-left");
});

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-page]").forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const page = this.getAttribute("data-page");

      fetch(page)
        .then(res => res.text())
        .then(html => {
          // Crear un DOM temporal
          const temp = document.createElement("div");
          temp.innerHTML = html;

          // Extraer estilos y cargarlos
          temp.querySelectorAll("link[rel='stylesheet']").forEach(cssLink => {
            if (!document.querySelector(`link[href="${cssLink.href}"]`)) {
              document.head.appendChild(cssLink.cloneNode());
            }
          });

          // Insertar solo el contenido (ej: .main-content)
          const content = temp.querySelector(".main-content");
          document.querySelector(".main").innerHTML = content.innerHTML;
        })
        .catch(err => console.error("Error cargando página:", err));
    });
  });
});

