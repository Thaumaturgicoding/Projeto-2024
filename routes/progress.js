// routes/progress.js - Rota para gerenciar o progresso do usuário
const express = require('express');
const router = express.Router();
const Progress = require('../models/Progress');

// Middleware para verificar se o usuário está logado
function isAuthenticated(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/users/login');
    }
}

// Rota para visualizar o progresso
router.get('/', isAuthenticated, (req, res) => {
    Progress.findOne({ userId: req.session.user._id })
        .then(progress => {
            if (progress) {
                res.render('viewProgress', { progress: progress });
            } else {
                res.render('viewProgress', { progress: null });
            }
        })
        .catch(err => res.status(500).send('Erro ao recuperar o progresso.'));
});

// routes/progress.js - Adicionando rota para atualizar o progresso
router.post('/update', isAuthenticated, (req, res) => {
    const { currentSmokesPerDay, milestoneDate } = req.body;
    Progress.findOne({ userId: req.session.user._id })
        .then(progress => {
            if (progress) {
                progress.currentSmokesPerDay = currentSmokesPerDay;
                progress.milestones.push({ date: milestoneDate, smokesPerDay: currentSmokesPerDay });
                return progress.save();
            } else {
                throw new Error('Progresso não encontrado.');
            }
        })
        .then(() => res.send('Progresso atualizado com sucesso.'))
        .catch(err => {
            console.error('Erro ao atualizar o progresso:', err);
            res.status(500).send('Erro ao atualizar o progresso.');
        });
});

// routes/progress.js - Rota para fornecer dados de progresso em formato JSON
router.get('/data', isAuthenticated, (req, res) => {
    Progress.find({ userId: req.session.user._id })
        .select('date smokesPerDay -_id')
        .sort('date')
        .then(progressRecords => {
            const data = {
                dates: progressRecords.map(pr => pr.date.toISOString().substring(0, 10)),
                smokesPerDay: progressRecords.map(pr => pr.smokesPerDay)
            };
            res.json(data);
        })
        .catch(err => {
            console.error('Erro ao recuperar dados de progresso:', err);
            res.status(500).json({ message: 'Erro ao recuperar dados de progresso' });
        });
});


module.exports = router;
