// public/js/logout.js - Script para gerenciar o logout
document.addEventListener('DOMContentLoaded', function() {
    const logoutButton = document.getElementById('logoutButton');

    logoutButton.addEventListener('click', function(event) {
        event.preventDefault();

        fetch('/users/logout', {
            method: 'GET'
        })
        .then(response => {
            if (response.ok) {
                window.location.href = '/';
            } else {
                alert('Erro ao tentar deslogar.');
            }
        })
        .catch(error => {
            console.error('Erro ao deslogar:', error);
            alert('Erro ao deslogar.');
        });
    });
});
