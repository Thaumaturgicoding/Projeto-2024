// public/js/goalForm.js - Script para gerenciar formulário de adição de metas
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('goalForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const targetSmokesPerDay = document.getElementById('targetSmokesPerDay').value;
        const targetDate = document.getElementById('targetDate').value;

        if (targetSmokesPerDay && targetDate) {
            fetch('/goals/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `targetSmokesPerDay=${targetSmokesPerDay}&targetDate=${targetDate}`
            })
            .then(response => response.text())
            .then(data => {
                alert('Meta adicionada com sucesso!');
                window.location.reload();
            })
            .catch(error => {
                console.error('Erro ao adicionar meta:', error);
                alert('Erro ao adicionar meta.');
            });
        }
    });
});
