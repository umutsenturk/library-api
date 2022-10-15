const Joi = require('joi');

const paramIdSchema = Joi.object({
  id:
    Joi.number()
      .integer()
      .required(),
});

const bodyNameSchema = Joi.object({
  name:
    Joi.string()
      .required(),
});

const paramIdsSchema = Joi.object({
  user_id:
    Joi.number()
      .integer()
      .required(),

  book_id:
    Joi.number()
      .integer()
      .required(),
});

const bodyScoreSchame = Joi.object({
  score:
    Joi.number()
      .integer()
      .min(0)
      .max(10)
      .required(),
});

exports.bodyNameSchema = bodyNameSchema;
exports.paramIdSchema = paramIdSchema;
exports.paramIdsSchema = paramIdsSchema;
exports.bodyScoreSchame = bodyScoreSchame;
