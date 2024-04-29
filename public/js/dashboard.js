// public/js/dashboard.js - Script para interações dinâmicas no dashboard
document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(item => item.classList.remove('active'));
            tabContents.forEach(content => content.classList.add('hidden'));

            const activeTab = document.querySelector(tab.dataset.target);
            tab.classList.add('active');
            activeTab.classList.remove('hidden');
        });
    });
});
