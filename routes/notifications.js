// routes/notifications.js - Rota para configurar notificações
const express = require('express');
const router = express.Router();
const { setupNotification } = require('../utils/notificationManager');

// Middleware para verificar se o usuário está logado
function isAuthenticated(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/users/login');
    }
}

// Rota para configurar notificações
router.post('/setup', isAuthenticated, (req, res) => {
    const { type, time } = req.body;
    setupNotification(req.session.user._id, type, time)
        .then(() => res.send('Notificação configurada com sucesso.'))
        .catch(err => {
            console.error('Erro ao configurar notificação:', err);
            res.status(500).send('Erro ao configurar notificação.');
        });
});

module.exports = router;
