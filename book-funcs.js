const fs = require('fs');

var booksData = JSON.parse(fs.readFileSync('books-data.json'));

module.exports = {
  addBook: function(bookObject) {
    books.push(bookObject);

    fs.writeFile('books-data.json', JSON.stringify(users), (error, data) => {
      if (error) {
        throw error;
      }
    });
  }
};

// function searchFirstName(input, user) {
//   return user.firstname.toLowerCase().includes(input.toLowerCase());
// }
//
// function searchLastName(input, user) {
//   return user.lastname.toLowerCase().includes(input.toLowerCase());
// }
