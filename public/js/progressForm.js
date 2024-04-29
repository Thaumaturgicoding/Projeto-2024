// public/js/progressForm.js - Script para gerenciar formulário de atualização de progresso
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('progressForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const currentSmokesPerDay = document.getElementById('currentSmokesPerDay').value;
        const milestoneDate = document.getElementById('milestoneDate').value;

        if (currentSmokesPerDay && milestoneDate) {
            fetch('/progress/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `currentSmokesPerDay=${currentSmokesPerDay}&milestoneDate=${milestoneDate}`
            })
            .then(response => response.text())
            .then(data => {
                alert('Progresso atualizado com sucesso!');
                window.location.reload();
            })
            .catch(error => {
                console.error('Erro ao atualizar progresso:', error);
                alert('Erro ao atualizar progresso.');
            });
        }
    });
});
