import { getRoles, createRol, updateRol, deleteRol } from "./authRequest.js";

document.addEventListener("DOMContentLoaded", () => {
  const checkTable = setInterval(() => {
    const tableBody = document.getElementById("rolesTableBody");
    if (tableBody) {
      clearInterval(checkTable);
      inicializarRoles();
    }
  }, 150);
});

export async function inicializarRoles() {
  const addRolBtn = document.getElementById("addRolBtn");
  const rolModal = document.getElementById("rolModal");
  const closeRolModal = document.getElementById("closeRolModal");
  const rolForm = document.getElementById("rolForm");
  const TableBody = document.getElementById("rolesTableBody");
  const deleteModal = document.getElementById("deleteRolModal");
  const confirmDeleteBtn = document.getElementById("confirmDeleteRol");
  const cancelDeleteBtn = document.getElementById("cancelDeleteRol");

  let rolIdAEliminar = null;
  const bsRolModal = new bootstrap.Modal(rolModal);
  const bsDeleteModal = new bootstrap.Modal(deleteModal);

  if (!addRolBtn || !rolModal || !rolForm || !TableBody) {
    console.warn("⚠️ Elementos del DOM no encontrados todavía.");
    return;
  }

  await cargarRoles();

  // === NUEVO ROL ===
  addRolBtn.addEventListener("click", () => {
    document.activeElement.blur(); // 👈 quita foco antes de abrir
    rolForm.reset();
    rolForm.dataset.editing = "";
    document.getElementById("modalTitle").textContent = "Nuevo Rol";
    bsRolModal.show();
  });

  // === CERRAR MODAL NUEVO/EDITAR ===
  closeRolModal.addEventListener("click", () => {
    document.activeElement.blur(); // 👈 evita warning al cerrar
    bsRolModal.hide();
  });

  // === GUARDAR ROL ===
  rolForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = rolForm.dataset.editing;
    const nombre = document.getElementById("rolNombre").value.trim();

    if (!nombre) {
      mostrarToast("El nombre del rol es obligatorio", "warning");
      return;
    }

    try {
      if (id) {
        await updateRol(id, nombre);
        mostrarToast("Rol actualizado correctamente", "success");
      } else {
        await createRol(nombre);
        mostrarToast("Rol creado exitosamente", "success");
      }

      document.activeElement.blur(); // 👈 evita warning
      bsRolModal.hide();
      await cargarRoles();
    } catch (error) {
      mostrarToast(error.message || "Error al guardar el rol", "danger");
    }
  });

  // === CARGAR ROLES ===
  async function cargarRoles() {
    TableBody.innerHTML = `<tr><td colspan="3" class="text-center">Cargando...</td></tr>`;
    try {
      const res = await getRoles();
      const roles = res.data || [];

      if (roles.length === 0) {
        TableBody.innerHTML = `<tr><td colspan="3" class="text-center">No hay roles registrados</td></tr>`;
        return;
      }

      TableBody.innerHTML = roles
        .map(
          (rol) => `
          <tr>
            <td>${rol.id}</td>
            <td>${rol.nombre}</td>
            <td class="text-center">
              <button class="edit-btn btn btn-sm btn-success me-2" data-id="${rol.id}" data-nombre="${rol.nombre}">
                <i class="fa fa-pen"></i> Editar
              </button>
              <button class="delete-btn btn btn-sm btn-danger" data-id="${rol.id}" data-nombre="${rol.nombre}">
                <i class="fa fa-trash"></i> Eliminar
              </button>
            </td>
          </tr>`
        )
        .join("");

      // === EDITAR ===
      document.querySelectorAll(".edit-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          document.activeElement.blur(); // 👈 previene warning
          const id = btn.dataset.id;
          const nombre = btn.dataset.nombre;
          document.getElementById("rolNombre").value = nombre;
          rolForm.dataset.editing = id;
          document.getElementById("modalTitle").textContent = "Editar Rol";
          bsRolModal.show();
        });
      });

      // === ELIMINAR ===
      document.querySelectorAll(".delete-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          document.activeElement.blur(); // 👈 evita conflicto de foco
          rolIdAEliminar = btn.dataset.id;
          const nombre = btn.dataset.nombre;
          document.getElementById("rolToDeleteName").textContent = nombre;
          bsDeleteModal.show();
        });
      });
    } catch (error) {
      console.error("Error cargando roles:", error);
      TableBody.innerHTML = `<tr><td colspan="3" class="text-center text-danger">Error al cargar roles</td></tr>`;
    }
  }

  // === CONFIRMAR ELIMINACIÓN ===
  confirmDeleteBtn.addEventListener("click", async () => {
    if (!rolIdAEliminar) return;
    try {
      await deleteRol(rolIdAEliminar);
      mostrarToast("Rol eliminado correctamente", "success");
      document.activeElement.blur(); // 👈 limpia foco antes de cerrar
      bsDeleteModal.hide();
      await cargarRoles();
    } catch (error) {
      mostrarToast(error.message || "Error al eliminar el rol", "danger");
    } finally {
      rolIdAEliminar = null;
    }
  });

  // === CANCELAR ELIMINACIÓN ===
  cancelDeleteBtn.addEventListener("click", () => {
    document.activeElement.blur(); // 👈 evita warning
    bsDeleteModal.hide();
  });

  // === TOAST ===
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
    const bsToast = new bootstrap.Toast(toast, { delay: 2000 });
    bsToast.show();
    toast.addEventListener("hidden.bs.toast", () => toast.remove());
  }
}