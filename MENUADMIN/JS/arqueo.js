export function inicializarArqueo() {
    const addArqueoBtn = document.getElementById("addArqueoBtn");
    const arqueoModal = document.getElementById("arqueoModal");
    const closeArqueoModal = document.getElementById("closeArqueoModal");
    const arqueoForm = document.getElementById("arqueoForm");
    const TableBody = document.getElementById("arqueoTableBody");

    // Abrir modal
    if (addArqueoBtn) {
        addArqueoBtn.addEventListener("click", () => {
            arqueoModal.classList.add("active");
        });
    }

    // Cerrar modal
    if (closeArqueoModal) {
        closeArqueoModal.addEventListener("click", () => {
            arqueoModal.classList.remove("active");
        });
    }

    // Guardar nueva factura
    if (arqueoForm) {
        arqueoForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const num = document.getElementById("arqueoId").value;
            const user = document.getElementById("arqueoUsuario").value;
            const date = document.getElementById("arqueoFecha").value;
            const saldoInicial = document.getElementById("arqueoInicial").value;
            const ingreso = document.getElementById("arqueoIngresos").value;
            const egreso = document.getElementById("arqueoEgresos").value;
            const saldo = document.getElementById("arqueoSaldo").value;
            const status = document.getElementById("arqueoEstado").value;

            const row = document.createElement("tr");
            row.innerHTML = `
        <td>${num}</td>
        <td>${user}</td>
        <td>${date}</td>
        <td>$${parseFloat(saldoInicial).toFixed(2)}</td>
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

            arqueoModal.classList.remove("active");
            arqueoForm.reset();
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
                const saldoInicial = cells[3].textContent.replace("$", "");
                const saldo = cells[4].textContent.replace("$", "");
                const ingreso = cells[5].textContent.replace("$", "");
                const egreso = cells[6].textContent.replace("$", "");
                const status = cells[7].textContent.toLowerCase();

                document.getElementById("arqueoId").value = num;
                document.getElementById("arqueoUsuario").value = user;
                document.getElementById("arqueoFecha").value = date;
                document.getElementById("arqueoInicial").value = saldoInicial;
                document.getElementById("arqueoIngresos").value = ingreso;
                document.getElementById("arqueoEgresos").value = egreso;
                document.getElementById("arqueoSaldo").value = saldo;
                document.getElementById("arqueoEstado").value = status;

                arqueoModal.classList.add("active");
                arqueoForm.dataset.editingRow = row.rowIndex;
            };
        });

    }

    // Inicializar eventos en las facturas ya existentes
    asignarEventos();
}
