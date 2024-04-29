// routes/record.js - Rota para gerenciar os registros de consumo
const express = require('express');
const router = express.Router();
const Record = require('../models/Record');

// Middleware para verificar se o usuário está logado
function isAuthenticated(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/users/login');
    }
}

// Rota para adicionar um novo registro
router.post('/add', isAuthenticated, (req, res) => {
    const newRecord = new Record({
        userId: req.session.user._id,
        smokesCount: req.body.smokesCount
    });

    newRecord.save()
        .then(record => res.status(201).send('Registro adicionado com sucesso.'))
        .catch(err => res.status(500).send('Erro ao salvar o registro.'));
});

// Rota para visualizar todos os registros
router.get('/', isAuthenticated, (req, res) => {
    Record.find({ userId: req.session.user._id })
        .then(records => {
            res.render('records', { records: records });
        })
        .catch(err => res.status(500).send('Erro ao recuperar os registros.'));
});

// routes/record.js - Adicionando rota para a página de adição de registros
router.get('/add', isAuthenticated, (req, res) => {
    res.render('addRecord');
});


module.exports = router;
