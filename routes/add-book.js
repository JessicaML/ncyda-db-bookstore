const express = require('express'),
      fs = require('fs'),
      router = express.Router();

var displayUsers = require('./../book-funcs');

router.get('/', (request, response) => {
  response.render('books/new');
});

router.post('/', (request, response) => {
  displayUsers.addUser(request.body);
  response.redirect('/');
});

module.exports = router;
