const db = require('../models/index');
const joiSchemas = require('../config/joi_schemas');

const Books = db.books;

// Create book.
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

  const book = {
    id: null,
    name: req.body.name,
  };

  // Creating in DB.
  Books.create(book)
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

// Get all books.
exports.findAll = (req, res) => {
  Books.findAll({ attributes: ['id', 'name'] })
    .then((data) => {
      if (data == '') {
        res.status(404).send({ error: 'There are no books.' });
      } else { res.send(data); }
    })
    .catch((err) => {
      res.status(500).send({
        message:
        err.message || 'Some error occurred while retrieving tutorials.',
      });
    });
};

// Get book with ID.
exports.findOne = (req, res) => {
  try {
    const value = joiSchemas.paramIdSchema.validate(req.params);
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

  Books.findOne({ attributes: ['id', 'name', 'score'], where: condition })
    .then((data) => {
      if (data == null) {
        res.status(404).send({ error: `There are no books with id ${id}` });
      } else { res.send(data); }
    })
    .catch((err) => {
      res.status(500).send({
        message:
      err.message || 'Some error occurred while retrieving tutorials.',
      });
    });
};
