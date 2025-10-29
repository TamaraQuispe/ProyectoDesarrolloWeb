export function inicializarreportes() {
    const addReporteBtn = document.getElementById("addReporteBtn");
    const reporteModal = document.getElementById("reporteModal");
    const closeReporteModal = document.getElementById("closeReporteModal");
    const reporteForm = document.getElementById("reporteForm");
    const TableBody = document.getElementById("reportesTableBody");

    // Abrir modal
    if (addReporteBtn) {
        addReporteBtn.addEventListener("click", () => {
            reporteModal.classList.add("active");
        });
    }

    // Cerrar modal
    if (closeReporteModal) {
        closeReporteModal.addEventListener("click", () => {
            reporteModal.classList.remove("active");
        });
    }

    // Guardar nueva factura
    if (reporteForm) {
        reporteForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const num = document.getElementById("reporteId").value;
            const user = document.getElementById("reporteUsuario").value;
            const date = document.getElementById("reporteFecha").value;
            const ingreso = document.getElementById("reporteIngresos").value;
            const egreso = document.getElementById("reporteEgresos").value;
            const saldo = document.getElementById("reporteSaldo").value;
            const status = document.getElementById("reporteEstado").value;

            const row = document.createElement("tr");
            row.innerHTML = `
        <td>${num}</td>
        <td>${user}</td>
        <td>${date}</td>
        <td>$${parseFloat(ingreso).toFixed(2)}</td>
        <td>$${parseFloat(egreso).toFixed(2)}</td>
        <td>$${parseFloat(saldo).toFixed(2)}</td>
        <td><span class="status ${status}">${status.charAt(0).toUpperCase() + status.slice(1)}</span></td>
        <td>
          <button class="edit-btn btn btn-sm btn-success">Editar</button>
          <button class="delete-btn btn btn-sm btn-warning">Eliminar</button>
        </td>
      `;
            TableBody.appendChild(row);

            reporteModal.classList.remove("active");
            reporteForm.reset();
            asignarEventos();
        });
    }

    // Funciones para editar y eliminar
    function asignarEventos() {
        document.querySelectorAll(".delete-btn").forEach(btn => {
            btn.onclick = () => {
                if (confirm("¿Seguro que deseas eliminar esta factura?")) {
                    btn.closest("tr").remove();
                }
            };
        });

        document.querySelectorAll(".edit-btn").forEach(btn => {
            btn.onclick = () => {
                const row = btn.closest("tr");
                const cells = row.querySelectorAll("td");

                const num = cells[0].textContent;
                const user = cells[1].textContent;
                const date = cells[2].textContent;
                const saldo = cells[3].textContent.replace("$", "");
                const ingreso = cells[4].textContent.replace("$", "");
                const egreso = cells[5].textContent.replace("$", "");
                const status = cells[6].textContent.toLowerCase();

                document.getElementById("reporteId").value = num;
                document.getElementById("reporteUsuario").value = user;
                document.getElementById("reporteFecha").value = date;
                document.getElementById("reporteIngresos").value = ingreso;
                document.getElementById("reporteEgresos").value = egreso;
                document.getElementById("reporteSaldo").value = saldo;
                document.getElementById("reporteEstado").value = status;

                reporteModal.classList.add("active");
                reporteForm.dataset.editingRow = row.rowIndex;
            };
        });

    }

    // Inicializar eventos en las facturas ya existentes
    asignarEventos();
}
