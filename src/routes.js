const {
  addBooksHandler,
  getAllBooksHandler,
  getBookById,
  editBookByIdHandler,
  deleteBookByIdHandler,
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
}, {
  method: 'DELETE',
  path: '/books/{id}',
  handler: deleteBookByIdHandler,
}];

module.exports = routes;
