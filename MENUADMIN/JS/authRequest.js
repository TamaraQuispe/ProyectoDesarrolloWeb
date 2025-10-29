import { apiRequest } from "./api.js";

/* ============================
   🔐 AUTENTICACIÓN
============================ */
export async function loginAdmin(email, password) {
  const endpoint = `/auth/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;
  return await apiRequest(endpoint, "POST");
}

export function logoutAdmin(redirect = true) {
  localStorage.removeItem("token");

  const toastElement = document.getElementById("logoutToast");
  const toastMessage = document.getElementById("logoutToastMessage");

  if (toastElement && toastMessage) {
    toastMessage.textContent = "Sesión cerrada correctamente";
    const toast = new bootstrap.Toast(toastElement, { delay: 2000 });
    toastElement.classList.add("show");
    toast.show();

    if (redirect) {
      setTimeout(() => (window.location.href = "loginadmin.html"), 2000);
    }
  } else if (redirect) {
    window.location.href = "loginadmin.html";
  }
}

/* ============================
   👑 ROLES
============================ */
export async function getRoles() {
  const token = localStorage.getItem("token");
  return await apiRequest("/roles", "GET", null, {
    Authorization: `Bearer ${token}`,
  });
}

export async function createRol(nombre) {
  const token = localStorage.getItem("token");
  return await apiRequest("/roles", "POST", { nombre }, {
    Authorization: `Bearer ${token}`,
  });
}

export async function updateRol(id, nombre) {
  const token = localStorage.getItem("token");
  return await apiRequest(`/roles/${id}`, "PUT", { nombre }, {
    Authorization: `Bearer ${token}`,
  });
}

export async function deleteRol(id) {
  const token = localStorage.getItem("token");
  return await apiRequest(`/roles/${id}`, "DELETE", null, {
    Authorization: `Bearer ${token}`,
  });
}

/* ============================
   👥 USUARIOS
============================ */
export async function getUsuarios() {
  const token = localStorage.getItem("token");
  return await apiRequest("/usuarios", "GET", null, {
    Authorization: `Bearer ${token}`,
  });
}

export async function createUsuario(body) {
  const token = localStorage.getItem("token");
  return await apiRequest("/usuarios", "POST", body, {
    Authorization: `Bearer ${token}`,
  });
}

export async function updateUsuario(id, body) {
  const token = localStorage.getItem("token");
  return await apiRequest(`/usuarios/${id}`, "PUT", body, {
    Authorization: `Bearer ${token}`,
  });
}

export async function deleteUsuario(id) {
  const token = localStorage.getItem("token");
  return await apiRequest(`/usuarios/${id}`, "DELETE", null, {
    Authorization: `Bearer ${token}`,
  });
}