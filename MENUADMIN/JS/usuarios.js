import {
  getRoles,
  getUsuarios,
  createUsuario,
  updateUsuario,
  deleteUsuario,
} from "./authRequest.js";

document.addEventListener("DOMContentLoaded", () => {
  const waitForTable = setInterval(() => {
    const usuariosTableBody = document.getElementById("usuariosTableBody");
    if (usuariosTableBody) {
      clearInterval(waitForTable);
      inicializarUsuarios();
    }
  }, 150);
});

export async function inicializarUsuarios() {
  const addUsuarioBtn = document.getElementById("addUsuarioBtn");
  const usuarioForm = document.getElementById("usuarioForm");
  const usuariosTableBody = document.getElementById("usuariosTableBody");
  const usuarioRolSelect = document.getElementById("usuarioRol");
  const deleteModal = document.getElementById("deleteUsuarioModal");
  const confirmDeleteBtn = document.getElementById("confirmDeleteUsuario");
  const usuarioModalEl = document.getElementById("usuarioModal");

  if (
    !addUsuarioBtn ||
    !usuarioForm ||
    !usuariosTableBody ||
    !usuarioRolSelect ||
    !deleteModal ||
    !usuarioModalEl
  ) {
    console.warn("⚠️ Elementos del DOM no encontrados todavía.");
    return;
  }

  // === Instancias modales ===
  const bsUsuarioModal = bootstrap.Modal.getOrCreateInstance(usuarioModalEl);
  const bsDeleteModal = bootstrap.Modal.getOrCreateInstance(deleteModal);
  let usuarioIdAEliminar = null;

  // === Evitar bug del backdrop gris ===
  usuarioModalEl.addEventListener("hidden.bs.modal", () => {
    const backdrops = document.querySelectorAll(".modal-backdrop");
    backdrops.forEach((b) => b.remove());
    document.body.classList.remove("modal-open");
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
  });

  // === Token ===
  const token = localStorage.getItem("token");
  if (!token) {
    mostrarToast("Debe iniciar sesión primero", "warning");
    setTimeout(() => (window.location.href = "loginadmin.html"), 1500);
    return;
  }

  // === Cargar roles ===
  async function cargarRoles() {
    try {
      const res = await getRoles();
      usuarioRolSelect.innerHTML = "";
      (res.data || []).forEach((r) => {
        const opt = document.createElement("option");
        opt.value = r.id;
        opt.textContent = r.nombre;
        usuarioRolSelect.appendChild(opt);
      });
    } catch {
      mostrarToast("Error al cargar roles", "danger");
    }
  }

  // === Cargar usuarios ===
  async function cargarUsuarios() {
    usuariosTableBody.innerHTML =
      "<tr><td colspan='5' class='text-center'>Cargando...</td></tr>";
    try {
      const response = await getUsuarios();
      const usuarios = response.data || [];

      if (usuarios.length === 0) {
        usuariosTableBody.innerHTML =
          "<tr><td colspan='5' class='text-center'>No hay usuarios registrados</td></tr>";
        return;
      }

      usuariosTableBody.innerHTML = usuarios
        .map(
          (u) => `
        <tr>
          <td>${u.id}</td>
          <td>${u.nombre}</td>
          <td>${u.email}</td>
          <td>${u.rol?.nombre ?? "Sin Rol"}</td>
          <td class="text-center">
            <button class="btn btn-sm btn-success me-2 edit-btn" data-id="${u.id}">
              <i class="fa fa-pen"></i> Editar
            </button>
            <button class="btn btn-sm btn-danger delete-btn" data-id="${u.id}" data-nombre="${u.nombre}">
              <i class="fa fa-trash"></i> Eliminar
            </button>
          </td>
        </tr>`
        )
        .join("");

      asignarEventos();
    } catch {
      usuariosTableBody.innerHTML =
        "<tr><td colspan='5' class='text-center text-danger'>Error al cargar usuarios</td></tr>";
    }
  }

  // === Abrir modal nuevo usuario ===
  addUsuarioBtn.addEventListener("click", () => {
    usuarioForm.reset();
    document.getElementById("usuarioId").value = "";
    document.getElementById("usuarioModalLabel").textContent = "Nuevo Usuario";
    bsUsuarioModal.show();
  });

  // === Guardar o actualizar usuario ===
  usuarioForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = document.getElementById("usuarioId").value;
    const nombre = document.getElementById("usuarioNombre").value.trim();
    const email = document.getElementById("usuarioEmail").value.trim();
    const password = document.getElementById("usuarioPassword").value.trim();
    const rolId = usuarioRolSelect.value;

    if (!nombre || !email || (!id && !password)) {
      mostrarToast("Todos los campos son obligatorios", "warning");
      return;
    }

    const body = {
      nombre,
      email,
      ...(id ? {} : { password }),
      rol: { id: parseInt(rolId) },
    };

    try {
      if (id) {
        await updateUsuario(id, body);
        mostrarToast("Usuario actualizado correctamente", "success");
      } else {
        await createUsuario(body);
        mostrarToast("Usuario creado correctamente", "success");
      }

      bsUsuarioModal.hide();
      await cargarUsuarios();
    } catch {
      mostrarToast("Error al guardar usuario", "danger");
    }
  });

  // === Editar y eliminar ===
  function asignarEventos() {
    document.querySelectorAll(".edit-btn").forEach((btn) => {
      btn.onclick = async () => {
        const id = btn.dataset.id;
        const response = await getUsuarios();
        const user = response.data.find((u) => u.id == id);
        if (!user) return;

        document.getElementById("usuarioId").value = user.id;
        document.getElementById("usuarioNombre").value = user.nombre;
        document.getElementById("usuarioEmail").value = user.email;
        document.getElementById("usuarioPassword").value = "";
        usuarioRolSelect.value = user.rol?.id ?? "";

        document.getElementById("usuarioModalLabel").textContent = "Editar Usuario";
        bsUsuarioModal.show();
      };
    });

    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.onclick = () => {
        usuarioIdAEliminar = btn.dataset.id;
        const nombre = btn.dataset.nombre;
        document.getElementById("usuarioToDeleteName").textContent = nombre;
        bsDeleteModal.show();
      };
    });
  }

  // === Confirmar eliminación ===
  confirmDeleteBtn.addEventListener("click", async () => {
    if (!usuarioIdAEliminar) return;
    try {
      await deleteUsuario(usuarioIdAEliminar);
      mostrarToast("Usuario eliminado correctamente", "success");
      bsDeleteModal.hide();
      await cargarUsuarios();
    } catch {
      mostrarToast("Error al eliminar usuario", "danger");
    } finally {
      usuarioIdAEliminar = null;
    }
  });

  // === Toast ===
  function mostrarToast(mensaje, tipo = "info") {
    const toast = document.createElement("div");
    toast.className = `toast align-items-center text-white bg-${tipo} border-0 position-fixed top-0 end-0 m-3`;
    toast.role = "alert";
    toast.innerHTML = `
      <div class="d-flex">
        <div class="toast-body">${mensaje}</div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
      </div>
    `;
    document.body.appendChild(toast);
    const bsToast = new bootstrap.Toast(toast, { delay: 2500 });
    bsToast.show();
    toast.addEventListener("hidden.bs.toast", () => toast.remove());
  }

  // === Inicializar ===
  await cargarRoles();
  await cargarUsuarios();
}
