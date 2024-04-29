// routes/dashboard.js - Rota para o dashboard do usuário
const express = require('express');
const router = express.Router();

// Middleware para verificar se o usuário está logado
function isAuthenticated(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/users/login');
    }
}

router.get('/', isAuthenticated, (req, res) => {
    res.render('dashboard', { user: req.session.user });
});

module.exports = router;
