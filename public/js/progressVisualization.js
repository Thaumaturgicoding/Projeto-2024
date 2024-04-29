// public/js/progressVisualization.js - Script para visualizar o progresso com gráficos
document.addEventListener('DOMContentLoaded', function() {
    fetch('/progress/data')
        .then(response => response.json())
        .then(data => {
            if (data) {
                renderProgressChart(data);
            }
        })
        .catch(error => console.error('Erro ao obter dados de progresso:', error));
});

function renderProgressChart(data) {
    const ctx = document.getElementById('progressChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.dates,
            datasets: [{
                label: 'Cigarros por Dia',
                data: data.smokesPerDay,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
