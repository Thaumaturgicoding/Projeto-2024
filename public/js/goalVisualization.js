// public/js/goalVisualization.js - Script para visualizar metas com gráficos
document.addEventListener('DOMContentLoaded', function() {
    fetch('/goals/data')
        .then(response => response.json())
        .then(data => {
            if (data) {
                renderGoalChart(data);
            }
        })
        .catch(error => console.error('Erro ao obter dados de metas:', error));
});

function renderGoalChart(data) {
    const ctx = document.getElementById('goalChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.dates,
            datasets: [{
                label: 'Meta de Cigarros por Dia',
                data: data.targetSmokesPerDay,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
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
