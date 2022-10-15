const _ = require('lodash');
const db = require('../models/index');

const Users = db.users;
const Books = db.books;
const BorrowedBooks = db.borrowed_books;
const joiSchemas = require('../config/joi_schemas');

// Return borrowed book.
exports.update = async (req, res) => {
  // Check params and body with Joi.
  try {
    const paramValue = await joiSchemas.paramIdsSchema.validateAsync(req.params);
    if (paramValue.error) {
      res.status(400).send(paramValue);
      return;
    }

    const bodyValue = await joiSchemas.bodyScoreSchame.validateAsync(req.body);
    if (bodyValue.error) {
      res.status(400).send(bodyValue);
      return;
    }
  } catch (err) {
    res.status(400).send(err);
    return;
  }

  // Check DB datas for availability.
  const userData = await Users.findOne({ where: { id: req.params.user_id } });
  if (!userData) {
    res.status(404).send({
      error: `There are no user with id ${
        req.params.user_id}`,
    });
    return;
  }

  const bookData = await Books.findOne({ where: { id: req.params.book_id } });
  if (!bookData) {
    res.status(404).send({
      error: `There are no book with id ${
        req.params.book_id}`,
    });
    return;
  }

  const borrowData = await BorrowedBooks.findOne({
    where: { user_id: req.params.user_id, book_id: req.params.book_id, is_returned: false },
  });
  if (!borrowData) {
    res.status(406).send({ error: "User didn't borrow this book." });
    return;
  }

  // Change borrowed book's review score.
  borrowData.review_score = req.body.score;
  borrowData.is_returned = true;
  borrowData.update();
  borrowData.save();

  // Calculate and change book's score and availability.
  let bookScore = bookData.score * (bookData.total_borrow - 1);
  bookScore = (bookScore + req.body.score) / (bookData.total_borrow);
  bookData.score = _.round(bookScore, 2);
  bookData.is_available = true;
  bookData.update();
  bookData.save();

  res.send();
};
