const express = require('express')
const { MongoClient } = require('mongodb')
const path = require('path')
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

/*
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});
*/

app.listen(port, () => {
    console.log("Servidor rodando...")
})

module.exports = app;
