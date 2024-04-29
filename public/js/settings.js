// public/js/settings.js - Script para gerenciar configurações do usuário
document.addEventListener('DOMContentLoaded', function() {
    const settingsForm = document.getElementById('settingsForm');

    settingsForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(settingsForm);
        const settingsData = Object.fromEntries(formData.entries());

        fetch('/users/settings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(settingsData)
        })
        .then(response => {
            if (response.ok) {
                alert('Configurações atualizadas com sucesso!');
            } else {
                alert('Falha ao atualizar as configurações.');
            }
        })
        .catch(error => {
            console.error('Erro ao atualizar configurações:', error);
            alert('Erro ao atualizar configurações.');
        });
    });
});
