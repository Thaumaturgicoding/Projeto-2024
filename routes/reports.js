// routes/reports.js - Rota para gerar e visualizar relatórios
const express = require('express');
const router = express.Router();
const { generateReport } = require('../utils/reportGenerator');

// Middleware para verificar se o usuário está logado
function isAuthenticated(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/users/login');
    }
}

// Rota para solicitar a geração de um relatório
router.post('/generate', isAuthenticated, (req, res) => {
    const { startDate, endDate } = req.body;
    generateReport(req.session.user._id, startDate, endDate)
        .then(reportId => res.json({ success: true, reportId: reportId }))
        .catch(err => {
            console.error('Erro ao gerar relatório:', err);
            res.status(500).json({ success: false, message: 'Erro ao gerar relatório' });
        });
});

// Rota para visualizar um relatório
router.get('/:reportId', isAuthenticated, (req, res) => {
    const { reportId } = req.params;
    res.send(`Visualizando relatório com ID: ${reportId}`);
});

// routes/reports.js - Rota para gerar relatórios
router.post('/generate', isAuthenticated, (req, res) => {
    const { startDate, endDate } = req.body;
    generateReport(req.session.user._id, startDate, endDate)
        .then(reportId => res.json({ success: true, reportId: reportId }))
        .catch(err => {
            console.error('Erro ao gerar relatório:', err);
            res.status(500).json({ success: false, message: 'Erro ao gerar relatório' });
        });
});

module.exports = router;
