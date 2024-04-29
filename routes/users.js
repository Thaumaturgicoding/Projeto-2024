// routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    User.findOne({ username: username }, (err, user) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error accessing the database.');
        } else if (!user || user.password !== password) {
            res.status(401).send('Invalid credentials.');
        } else {
            req.session.user = user;  // Armazena o usuário na sessão
            res.redirect('/dashboard'); // Direciona para o dashboard
        }
    });
});

// routes/users.js - Adicionando rota de logout
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Failed to log out.');
        }
        res.redirect('/');
    });
});


// routes/users.js - Refatoração da rota de logout para melhor integração com o frontend
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Erro ao deslogar:', err);
            res.status(500).send('Erro ao deslogar.');
        } else {
            res.redirect('/');
        }
    });
});

// routes/users.js - Adicionando rota para atualizar configurações do usuário
router.post('/settings', isAuthenticated, (req, res) => {
    const { email, password } = req.body;
    User.findByIdAndUpdate(req.session.user._id, { email, password }, { new: true })
        .then(user => {
            if (!user) {
                res.status(404).send('Usuário não encontrado.');
            } else {
                res.send('Configurações atualizadas com sucesso.');
            }
        })
        .catch(err => {
            console.error('Erro ao atualizar usuário:', err);
            res.status(500).send('Erro ao atualizar configurações.');
        });
});


module.exports = router;
