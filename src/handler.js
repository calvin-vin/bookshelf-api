const {nanoid} = require('nanoid');
const books = require('./books');

const addBooksHandler = (request, h) => {
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;

  // Server akan merespon gagal bila client tidak mengirimkan properti nama
  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  // Server akan merespon gagal
  // bila client mengirimkan properti readPage > properti pageCount
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. ' +
      'readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  const id = nanoid(16);
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBooks = {
    id, name, year, author,
    summary, publisher, pageCount, readPage,
    finished, reading, insertedAt, updatedAt,
  };

  books.push(newBooks);

  const isSuccess = books.filter((book) => book.id == id).length > 0;

  // Buku berhasil ditambahkan
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }

  // Server gagal memasukkan buku karena alasan umum
  const response = h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan',
  });
  response.code(500);
  return response;
};

const getAllBooksHandler = (request, h) => {
  const {name, reading, finished} = request.query;
  const response = {
    status: 'success',
    data: {
      books: books,
    },
  };
  // Query parameter nama
  if (name) {
    response.data.books = response.data.books.filter((book) => {
      return book.name.toLowerCase().includes(name.toLowerCase());
    });
  }
  // Query parameter reading
  if (reading === '0') {
    response.data.books = response.data.books.filter((book) => {
      return book.reading == false;
    });
  } else if (reading === '1') {
    response.data.books = response.data.books.filter((book) => {
      return book.reading == true;
    });
  }
  // Query parameter finished
  if (finished === '0') {
    response.data.books = response.data.books.filter((book) => {
      return book.finished == false;
    });
  } else if (finished === '1') {
    response.data.books = response.data.books.filter((book) => {
      return book.finished == true;
    });
  }
  // Mapping menjadi data baru
  response.data.books = response.data.books.map((book) => ({
    id: book.id, name: book.name, publisher: book.publisher,
  }));
  return h.response(response);
};

module.exports = {addBooksHandler, getAllBooksHandler};
