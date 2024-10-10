const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts'); // Adicione esta linha

const db = require('./models');

const indexRouter = require('./routes/index');
const inserirRouter = require('./routes/inserir');
const calcularRouter = require('./routes/calcular');
const exibirRouter = require('./routes/exibir');
const apiRouter = require('./routes/api');

const app = express();

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

// Configurações
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layout'); // Define o layout padrão

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayouts); // Adicione esta linha

// Rotas
app.use('/', indexRouter);
app.use('/inserir', inserirRouter);
app.use('/calcular', calcularRouter);
app.use('/exibir', exibirRouter);
app.use('/api', apiRouter);

// Sincronizar o banco de dados
db.sequelize.sync().then(() => {
  console.log('Banco de dados sincronizado.');
}).catch((err) => {
  console.error('Erro ao sincronizar o banco de dados:', err);
});

// Iniciar o servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

module.exports = app;
