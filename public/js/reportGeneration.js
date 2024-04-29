// public/js/reportGeneration.js - Script para gerar relatórios de progresso e metas
document.addEventListener('DOMContentLoaded', function() {
    const reportForm = document.getElementById('reportForm');

    reportForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(reportForm);
        const reportData = Object.fromEntries(formData.entries());

        fetch('/reports/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reportData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = `/reports/${data.reportId}`;
            } else {
                alert('Falha ao gerar relatório.');
            }
        })
        .catch(error => {
            console.error('Erro ao gerar relatório:', error);
            alert('Erro ao gerar relatório.');
        });
    });
});
