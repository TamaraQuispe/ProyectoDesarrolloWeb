document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("myChart");
  if (!canvas) {
    console.warn("⚠️ No se encontró el elemento #myChart en el DOM.");
    return;
  }

  const ctx = canvas.getContext("2d");

  const graficoIngresos = new Chart(ctx, {
    type: "line", // Puedes cambiar a 'bar', 'pie', etc.
    data: {
      labels: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"], // días de la semana
      datasets: [
        {
          label: "Ingresos (S/.)",
          data: [120, 200, 150, 300, 250, 400, 350], // valores de ejemplo
          borderColor: "#6f4e37", // marrón pastel
          backgroundColor: "rgba(111, 78, 55, 0.2)",
          borderWidth: 2,
          tension: 0.4, // curva suave
          fill: true,
          pointBackgroundColor: "#a9745b",
          pointRadius: 5,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          labels: {
            color: "#5c2d06",
            font: { size: 14 },
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: "#5c2d06",
          },
          grid: {
            color: "#f0e6e1",
          },
        },
        y: {
          ticks: {
            color: "#5c2d06",
          },
          grid: {
            color: "#f0e6e1",
          },
        },
      },
    },
  });
});