const express = require('express')
const { MongoClient } = require('mongodb')
const path = require('path')
const createError = require('http-errors')
require('dotenv').config()
const uri = process.env.URI
const client = new MongoClient(uri)

var homeRouter = require('./routes/home')
var catalogoRouter = require('./routes/catalogo')
var favoritosRouter = require('./routes/favoritos')
var explorarRouter = require('./routes/explorar')
var sobreRouter = require('./routes/sobre')

const port = 5000;
var app = express()

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//requisições para o projeto
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', homeRouter)
app.use('/catalogo', catalogoRouter)
app.use('/favoritos', favoritosRouter)
app.use('/explorar', explorarRouter)
app.use('/sobre', sobreRouter)

app.use((req, res, next) => {
    next(createError(404));
});

client.connect()
    .then(() => {
        app.locals.db = client.db()
        app.listen(port,() => {
            console.log(`Servidor rodando em http://localhost:${port}`)
        })
    })
    .catch(err => {
        console.error('Erro ao conectar ao MongoDB:', err.message)
        process.exit(1)
    })

module.exports = app;
