import { loginAdmin } from "./authRequest.js";

const togglePassword = document.getElementById("togglePassword");
const passwordField = document.getElementById("password");

togglePassword.addEventListener("click", () => {
    const type = passwordField.getAttribute("type") === "password" ? "text" : "password";
    passwordField.setAttribute("type", type);
    togglePassword.querySelector("i").classList.toggle("fa-eye");
    togglePassword.querySelector("i").classList.toggle("fa-eye-slash");
});

const toastElement = document.getElementById("liveToast");
const toastMessage = document.getElementById("toastMessage");
const toast = new bootstrap.Toast(toastElement, { delay: 2500 });

document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
        const response = await loginAdmin(email, password);

        if (response.success && response.data) {
            localStorage.setItem("token", response.data);

            toastElement.classList.remove("toast-error");
            toastElement.classList.add("toast-success");
            toastMessage.textContent = response.message || "Inicio de sesión exitoso 🎉";
            toast.show();

            setTimeout(() => {
                window.location.href = "admin_index.html";
            }, 1500);
        } else {
            throw new Error(response.message || "Credenciales inválidas");
        }

    } catch (error) {
        toastElement.classList.remove("toast-success");
        toastElement.classList.add("toast-error");
        toastMessage.textContent = "Credenciales incorrectas o error en el servidor";
        toast.show();
    }
});

const iconos = ["🎂", "🍰", "🍩", "🍪", "🍦", "🧁"];
const cantidad = 20;
for (let i = 0; i < cantidad; i++) {
    const confeti = document.createElement("div");
    confeti.classList.add("confeti");
    confeti.textContent = iconos[Math.floor(Math.random() * iconos.length)];
    confeti.style.left = Math.random() * 100 + "vw";
    confeti.style.bottom = "-10vh";
    confeti.style.fontSize = Math.random() * 20 + 15 + "px";
    confeti.style.animationDuration = (Math.random() * 5 + 8) + "s";
    confeti.style.animationDelay = Math.random() * 5 + "s";
    document.body.appendChild(confeti);
}