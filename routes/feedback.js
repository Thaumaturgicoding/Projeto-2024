// routes/feedback.js - Rota para gerenciar feedback dos usuários
const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

// Middleware para verificar se o usuário está logado
function isAuthenticated(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/users/login');
    }
}

// Rota para enviar feedback
router.post('/submit', isAuthenticated, (req, res) => {
    const newFeedback = new Feedback({
        userId: req.session.user._id,
        content: req.body.content
    });

    newFeedback.save()
        .then(() => res.status(201).send('Feedback enviado com sucesso.'))
        .catch(err => res.status(500).send('Erro ao enviar feedback.'));
});

module.exports = router;
