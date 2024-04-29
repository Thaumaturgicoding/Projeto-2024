// public/js/analysis.js - Script para análise de dados avançada e geração de insights
document.addEventListener('DOMContentLoaded', function() {
    const analysisButton = document.getElementById('runAnalysis');

    analysisButton.addEventListener('click', function() {
        fetch('/analysis/run')
            .then(response => response.json())
            .then(data => {
                displayAnalysisResults(data);
            })
            .catch(error => {
                console.error('Erro ao executar análise:', error);
                alert('Falha ao executar análise.');
            });
    });
});

function displayAnalysisResults(data) {
    const resultsContainer = document.getElementById('analysisResults');
    resultsContainer.innerHTML = ''; // Limpar resultados anteriores
    data.forEach(result => {
        const resultElement = document.createElement('p');
        resultElement.textContent = `Insight: ${result.insight}`;
        resultsContainer.appendChild(resultElement);
    });
}
