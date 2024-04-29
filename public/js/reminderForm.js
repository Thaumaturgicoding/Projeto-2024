// public/js/reminderForm.js - Script para gerenciar formulário de adição de lembretes
document.addEventListener('DOMContentLoaded', function() {
    const reminderForm = document.getElementById('reminderForm');

    reminderForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(reminderForm);
        const reminderData = Object.fromEntries(formData.entries());

        fetch('/reminders/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reminderData)
        })
        .then(response => {
            if (response.ok) {
                alert('Lembrete adicionado com sucesso!');
                window.location.reload();
            } else {
                response.text().then(text => alert(text));
            }
        })
        .catch(error => {
            console.error('Erro ao adicionar lembrete:', error);
            alert('Erro ao adicionar lembrete.');
        });
    });
});
