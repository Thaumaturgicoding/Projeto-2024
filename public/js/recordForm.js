// public/js/recordForm.js - Script para gerenciar formulário de adição de registros
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('recordForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const smokesCount = document.getElementById('smokesCount').value;
        if (smokesCount) {
            fetch('/records/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `smokesCount=${smokesCount}`
            })
            .then(response => response.text())
            .then(data => {
                alert('Registro adicionado com sucesso!');
                window.location.reload();
            })
            .catch(error => {
                console.error('Erro ao adicionar registro:', error);
                alert('Erro ao adicionar registro.');
            });
        }
    });
});
