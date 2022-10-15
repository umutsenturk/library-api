const db = require('../models/index');

const Users = db.users;
const Books = db.books;
const BorrowedBooks = db.borrowed_books;
const joiSchemas = require('../config/joi_schemas');

// Create borrowed book.
exports.create = async (req, res) => {
  // ID validation with Joi.
  try {
    const value = await joiSchemas.paramIdsSchema.validateAsync(req.params);
    if (value.error) {
      res.status(400).send(value);
      return;
    }
  } catch (err) {
    res.status(400).send(err);
    return;
  }

  // Check DB datas for availability.
  const userData = await Users.findOne({ where: { id: req.params.user_id } });
  if (!userData) {
    res.status(404).send({ error: `There are no user with id ${req.params.user_id}` });
    return;
  }
  const bookData = await Books.findOne({ where: { id: req.params.book_id } });
  if (!bookData) {
    res.status(404).send({ error: `There are no book with id ${req.params.book_id}` });
    return;
  }

  if (bookData.is_available == false) {
    res.status(406).send({ error: 'This book is unavailable.' });
    return;
  }

  // Create borrowed book object.
  const borrowData = {
    id: null,
    book_id: req.params.book_id,
    book_name: bookData.name,
    user_id: req.params.user_id,
    is_returned: false,
    review_score: null,
  };

  // Set book's availability.
  bookData.is_available = false;
  bookData.total_borrow += 1;
  bookData.update();
  bookData.save();

  // Create borrowed book.
  BorrowedBooks.create(borrowData)
    .then(() => {
      res.send();
    })
    .catch((err) => {
      res.status(500).send({
        message:
            err.message || 'Some error occurred while borrowing book.',
      });
    });
};
