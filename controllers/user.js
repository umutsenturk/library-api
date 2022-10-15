const db = require('../models/index');

const Users = db.users;
const BorrowedBooks = db.borrowed_books;
const joiSchemas = require('../config/joi_schemas');

// Create user.
exports.create = (req, res) => {
  // Body validation with Joi.
  try {
    const value = joiSchemas.bodyNameSchema.validate(req.body);
    if (value.error) {
      res.status(400).send(value);
      return;
    }
  } catch (err) {
    res.status(400).send(err);
    return;
  }

  const user = {
    id: null,
    name: req.body.name,
  };

  // Creating user.
  Users.create(user)
    .then(() => {
      res.send();
    })
    .catch((err) => {
      res.status(500).send({
        message:
            err.message || 'Some error occurred while creating the User.',
      });
    });
};

// Get all users.
exports.findAll = (req, res) => {
  Users.findAll({ attributes: ['id', 'name'] })
    .then((data) => {
      if (data == '') { res.status(404).send({ error: 'There are no users.' }); } else { res.send(data); }
    })
    .catch((err) => {
      res.status(500).send({
        message:
            err.message || 'Some error occurred while retrieving tutorials.',
      });
    });
};

// Get a user with ID.
exports.findOne = async (req, res) => {
  // Check params with Joi.
  try {
    const value = await joiSchemas.paramIdSchema.validateAsync(req.params);
    if (value.error) {
      res.status(400).send(value);
      return;
    }
  } catch (err) {
    res.status(400).send(err);
    return;
  }
  const { id } = req.params;
  const condition = id ? { id } : null;

  // Retrieve past and present borrowed books.
  const pastBorrowed = await BorrowedBooks.findAll({ attributes: [['book_name', 'name'], ['review_score', 'userScore']], where: { user_id: id, is_returned: true } });

  const presentBorrowed = await BorrowedBooks.findAll({ attributes: [['book_name', 'name']], where: { user_id: id, is_returned: false } });

  // Get user data and send JSON.
  Users.findOne({ where: condition })
    .then((data) => {
      if (data == null) {
        res.status(404).send({ error: `There are no users with id ${id}` });
      } else {
        data.books = { past: pastBorrowed, present: presentBorrowed };
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
            err.message || 'Some error occurred while retrieving tutorials.',
      });
    });
};
