module.exports = (app) => {
  const returnBook = require('../controllers/return_book');

  const router = require('express').Router();

  router.post('/:user_id/return/:book_id', returnBook.update);

  app.use('/users/', router);
};
