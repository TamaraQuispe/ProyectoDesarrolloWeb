document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("modalPassword");
    const btnCambiar = document.getElementById("btnCambiarPassword");
    const cancelBtn = document.getElementById("cancelModal");
    const saveBtn = modal.querySelector(".save-btn");
    const formPassword = document.getElementById("formPassword");
  
    // Abrir modal
    btnCambiar?.addEventListener("click", () => {
      modal.style.display = "flex";
      setTimeout(() => modal.classList.add("show-modal"), 10); // animación suave
    });
  
    // Cerrar modal
    cancelBtn.addEventListener("click", () => {
      modal.classList.remove("show-modal");
      setTimeout(() => modal.style.display = "none", 300); // espera la animación
      formPassword.reset();
    });
  
    // Guardar contraseña (solo maqueta)
    saveBtn.addEventListener("click", () => {
      console.log("Contraseña actual:", document.getElementById('currentPassword').value);
      console.log("Contraseña nueva:", document.getElementById('newPassword').value);
      modal.classList.remove("show-modal");
      setTimeout(() => modal.style.display = "none", 300);
      formPassword.reset();
    });
  
    // Toggle para ver/ocultar contraseña
    document.querySelectorAll(".toggle-password").forEach(span => {
      span.addEventListener("click", () => {
        const input = document.getElementById(span.dataset.target);
        input.type = input.type === "password" ? "text" : "password";
      });
    });
  });  