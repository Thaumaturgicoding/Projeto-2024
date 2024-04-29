// routes/goals.js - Rota para gerenciar metas de redução de tabaco
const express = require('express');
const router = express.Router();
const Goal = require('../models/Goal');

// Middleware para verificar se o usuário está logado
function isAuthenticated(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/users/login');
    }
}

// Rota para adicionar uma nova meta
router.post('/add', isAuthenticated, (req, res) => {
    const newGoal = new Goal({
        userId: req.session.user._id,
        targetSmokesPerDay: req.body.targetSmokesPerDay,
        targetDate: req.body.targetDate
    });

    newGoal.save()
        .then(goal => res.status(201).send('Meta adicionada com sucesso.'))
        .catch(err => res.status(500).send('Erro ao salvar a meta.'));
});

// Rota para visualizar as metas
router.get('/', isAuthenticated, (req, res) => {
    Goal.find({ userId: req.session.user._id })
        .then(goals => {
            res.render('viewGoals', { goals: goals });
        })
        .catch(err => res.status(500).send('Erro ao recuperar as metas.'));
});

// routes/goals.js - Rota para fornecer dados de metas em formato JSON
router.get('/data', isAuthenticated, (req, res) => {
    Goal.find({ userId: req.session.user._id })
        .select('targetDate targetSmokesPerDay -_id')
        .sort('targetDate')
        .then(goals => {
            const data = {
                dates: goals.map(g => g.targetDate.toISOString().substring(0, 10)),
                targetSmokesPerDay: goals.map(g => g.targetSmokesPerDay)
            };
            res.json(data);
        })
        .catch(err => {
            console.error('Erro ao recuperar dados de metas:', err);
            res.status(500).json({ message: 'Erro ao recuperar dados de metas' });
        });
});


module.exports = router;
