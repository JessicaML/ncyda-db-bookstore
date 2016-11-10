const express = require('express'),
      morgan = require('morgan'),
      bodyParser = require('body-parser'),
      methodOverride = require('method-override'),
      pug = require('pug'),
      Sequelize = require('sequelize');

var app = express(),
    sequelize = new Sequelize('Jessica', 'Jessica', '', { dialect: 'postgres' });

var booksRouter = require('./routes/books');

var Book = sequelize.define('book', {
  title: Sequelize.STRING,
  imageURL: Sequelize.STRING,
  author: Sequelize.STRING,
  description: Sequelize.TEXT
});

app.use(express.static('public'));

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(methodOverride((req, res) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }})
);

app.set('view engine', 'pug');

app.get('/', (request, response) => {
  response.redirect('/books');
});

app.get('/books', (request, response) => {
  Book.findAll().then((books) => {
    response.render('books/index', { books: books });
  });
});

app.post('/books', (request, response) => {
  Book.create(request.body).then(() => {
    response.redirect('/books');
  });
});

app.get('/books/new', (request, response) => {
  response.render('books/new');
});

app.get('/books/:id/edit', (request, response) => {
  Book.findById(request.params.id).then((book) => {
    response.render('books/edit', { book: book });
  });
});

app.use('/books', booksRouter);

sequelize.sync().then(() => {
  console.log('Connected to database');
  app.listen(3000, () => {
    console.log('Web Server is running on port 3000');
  });
});
