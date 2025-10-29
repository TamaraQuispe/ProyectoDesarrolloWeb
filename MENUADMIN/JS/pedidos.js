export function inicializarPedido() {
    const addPedidoBtn = document.getElementById("addPedidoBtn");
    const pedidoModal = document.getElementById("pedidoModal");
    const closePedidoModal = document.getElementById("closePedidoModal");
    const pedidoForm = document.getElementById("pedidoForm");
    const TableBody = document.getElementById("pedidosTableBody");

    // Abrir modal
    if (addPedidoBtn) {
        addPedidoBtn.addEventListener("click", () => {
            pedidoModal.classList.add("active");
        });
    }

    // Cerrar modal
    if (closePedidoModal) {
        closePedidoModal.addEventListener("click", () => {
            pedidoModal.classList.remove("active");
        });
    }

    // Guardar nueva factura
    if (pedidoForm) {
        pedidoForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const num = document.getElementById("pedidoNumber").value;
            const client = document.getElementById("pedidoCliente").value;
            const date = document.getElementById("pedidoFecha").value;
            const total = document.getElementById("pedidoTotal").value;
            const status = document.getElementById("pedidoEstado").value;

            const row = document.createElement("tr");
            row.innerHTML = `
        <td>${num}</td>
        <td>${client}</td>
        <td>${date}</td>
        <td>$${parseFloat(total).toFixed(2)}</td>
        <td><span class="status ${status}">${status.charAt(0).toUpperCase() + status.slice(1)}</span></td>
        <td>
          <button class="edit-btn btn btn-sm btn-success">Editar</button>
          <button class="delete-btn btn btn-sm btn-warning">Eliminar</button>
        </td>
      `;
            TableBody.appendChild(row);

            pedidoModal.classList.remove("active");
            pedidoForm.reset();
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
                const client = cells[1].textContent;
                const date = cells[2].textContent;
                const total = cells[3].textContent.replace("$", "");
                const status = cells[4].textContent.toLowerCase();

                document.getElementById("pedidoNumber").value = num;
                document.getElementById("pedidoCliente").value = client;
                document.getElementById("pedidoFecha").value = date;
                document.getElementById("pedidoTotal").value = total;
                document.getElementById("pedidoEstado").value = status;

                pedidoModal.classList.add("active");
                pedidoForm.dataset.editingRow = row.rowIndex;
            };
        });

    }

    // Inicializar eventos en las facturas ya existentes
    asignarEventos();
}
