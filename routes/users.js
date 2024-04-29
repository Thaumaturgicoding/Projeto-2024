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


module.exports = router;
