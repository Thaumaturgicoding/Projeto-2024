// routes/reminders.js - Rota para gerenciar lembretes do usuário
const express = require('express');
const router = express.Router();
const Reminder = require('../models/Reminder');

// Middleware para verificar se o usuário está logado
function isAuthenticated(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/users/login');
    }
}

// Rota para criar um novo lembrete
router.post('/create', isAuthenticated, (req, res) => {
    const newReminder = new Reminder({
        userId: req.session.user._id,
        message: req.body.message,
        remindOn: req.body.remindOn
    });

    newReminder.save()
        .then(() => res.status(201).send('Lembrete criado com sucesso.'))
        .catch(err => res.status(500).send('Erro ao criar lembrete.'));
});

// Rota para visualizar todos os lembretes
router.get('/', isAuthenticated, (req, res) => {
    Reminder.find({ userId: req.session.user._id })
        .sort('remindOn')
        .then(reminders => {
            res.render('viewReminders', { reminders: reminders });
        })
        .catch(err => res.status(500).send('Erro ao recuperar lembretes.'));
});

module.exports = router;
