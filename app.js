const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();

// Conexão com o MongoDB
mongoose.connect('mongodb://localhost/tobaccoTracker', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));


// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
    secret: 'segredo muito secreto',
    resave: false,
    saveUninitialized: true,
    cookie:{secure: true}
}));


// Configuração do EJS
app.set('view engine', 'ejs');

// Roteadores
const indexRoutes = require('./routes/index');
const userRoutes = require('./routes/users');
app.use('/', indexRoutes);
app.use('/users', userRoutes);

// Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

// app.js - Integrando a rota do dashboard
const dashboardRoutes = require('./routes/dashboard');
app.use('/dashboard', dashboardRoutes);

// app.js - Integrando a rota de registros
const recordRoutes = require('./routes/record');
app.use('/records', recordRoutes);

// app.js - Integrando a rota de progresso
const progressRoutes = require('./routes/progress');
app.use('/progress', progressRoutes);

// app.js - Integrando a rota de metas
const goalsRoutes = require('./routes/goals');
app.use('/goals', goalsRoutes);

// routes/goals.js - Adicionando rota para a página de adição de metas
router.get('/add', isAuthenticated, (req, res) => {
    res.render('addGoal');
});
