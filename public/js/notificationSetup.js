// public/js/notificationSetup.js - Script para configurar notificações e lembretes automáticos
document.addEventListener('DOMContentLoaded', function() {
    const notificationForm = document.getElementById('notificationForm');

    notificationForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(notificationForm);
        const notificationData = Object.fromEntries(formData.entries());

        fetch('/notifications/setup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(notificationData)
        })
        .then(response => {
            if (response.ok) {
                alert('Notificação configurada com sucesso!');
                window.location.reload();
            } else {
                response.text().then(text => alert(text));
            }
        })
        .catch(error => {
            console.error('Erro ao configurar notificação:', error);
            alert('Erro ao configurar notificação.');
        });
    });
});
