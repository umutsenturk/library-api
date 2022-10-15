module.exports = (app) => {
  const borrow = require('../controllers/borrow');

  const router = require('express').Router();

  router.post('/:user_id/borrow/:book_id', borrow.create);

  app.use('/users/', router);
};
