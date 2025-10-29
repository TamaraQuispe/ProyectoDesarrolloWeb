import { inicializarFacturacion } from "./facturacion.js";
import { inicializarPedido } from "./pedidos.js";
import { inicializarUsuarios } from "./usuarios.js";
import { inicializarreportes } from "./reportes.js";
import { inicializarArqueo } from "./arqueo.js";
import { inicializarRoles } from "./roles.js";
import { logoutAdmin } from "./authRequest.js";

const menuHambur = document.querySelector(".toggle-btn");
const toggler = document.querySelector("#icono");

menuHambur.addEventListener("click", function () {
  document.querySelector("#sidebar").classList.toggle("expand");
  toggler.classList.toggle("fa-chevron-right");
  toggler.classList.toggle("fa-chevron-left");
});

document.addEventListener("DOMContentLoaded", () => {
  fetch("dashboard.html")
    .then(res => res.text())
    .then(html => {
      const temp = document.createElement("div");
      temp.innerHTML = html;

      temp.querySelectorAll("link[rel='stylesheet']").forEach(cssLink => {
        if (!document.querySelector(`link[href="${cssLink.href}"]`)) {
          document.head.appendChild(cssLink.cloneNode());
        }
      });

      const content = temp.querySelector(".main-content");
      document.querySelector(".main").innerHTML = content.innerHTML;
    })
    .catch(err => console.error("Error cargando dashboard:", err));

  document.querySelectorAll("[data-page]").forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const page = this.getAttribute("data-page");

      fetch(page)
        .then(res => res.text())
        .then(html => {
          const temp = document.createElement("div");
          temp.innerHTML = html;

          temp.querySelectorAll("link[rel='stylesheet']").forEach(cssLink => {
            if (!document.querySelector(`link[href="${cssLink.href}"]`)) {
              document.head.appendChild(cssLink.cloneNode());
            }
          });

          const content = temp.querySelector(".main-content");
          document.querySelector(".main").innerHTML = content.innerHTML;


          const inicializadores = {
            facturacion: inicializarFacturacion,
            pedidos: inicializarPedido,
            usuarios: inicializarUsuarios,
            reportes: inicializarreportes,
            arqueo: inicializarArqueo,
            roles: inicializarRoles,
          };

          const nombrePagina = page.split(".")[0];
          setTimeout(() => {
            if (typeof inicializadores[nombrePagina] === "function") {
              inicializadores[nombrePagina]();
            }
          }, 100);

        })
        .catch(err => console.error("Error cargando página:", err));
    });
  });

  const logoutButton = document.getElementById("logoutBtn");
  if (logoutButton) {
    logoutButton.addEventListener("click", (e) => {
      e.preventDefault();
      logoutAdmin(); 
    });
  }
});