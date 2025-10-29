export function inicializarFacturacion() {
  const addInvoiceBtn = document.getElementById("addInvoiceBtn");
  const invoiceModal = document.getElementById("invoiceModal");
  const closeModal = document.getElementById("closeModal");
  const invoiceForm = document.getElementById("invoiceForm");
  const tableBody = document.getElementById("invoiceTableBody");

  if (addInvoiceBtn) {
    addInvoiceBtn.addEventListener("click", () => {
      invoiceModal.classList.add("active");
    });
  }

  if (closeModal) {
    closeModal.addEventListener("click", () => {
      invoiceModal.classList.remove("active");
    });
  }

  if (invoiceForm) {
    invoiceForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const num = document.getElementById("invoiceNumber").value;
      const client = document.getElementById("clientName").value;
      const date = document.getElementById("invoiceDate").value;
      const total = document.getElementById("invoiceTotal").value;
      const status = document.getElementById("invoiceStatus").value;

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
      tableBody.appendChild(row);

      invoiceModal.classList.remove("active");
      invoiceForm.reset();
      asignarEventos();
    });
  }

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

        document.getElementById("invoiceNumber").value = num;
        document.getElementById("clientName").value = client;
        document.getElementById("invoiceDate").value = date;

        document.getElementById("invoiceTotal").value = total;
        document.getElementById("invoiceStatus").value = status;

        invoiceModal.classList.add("active");
        invoiceForm.dataset.editingRow = row.rowIndex;
      };
    });

  }

  asignarEventos();
}
