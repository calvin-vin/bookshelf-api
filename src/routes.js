const {
  addBooksHandler,
  getAllBooksHandler,
  getBookById,
  editBookByIdHandler,
} = require('./handler');

const routes = [{
  method: 'POST',
  path: '/books',
  handler: addBooksHandler,
}, {
  method: 'GET',
  path: '/books',
  handler: getAllBooksHandler,
}, {
  method: 'GET',
  path: '/books/{id}',
  handler: getBookById,
}, {
  method: 'PUT',
  path: '/books/{id}',
  handler: editBookByIdHandler,
}];

module.exports = routes;
