const Joi = require('joi');

// Define the error messages for each validation rule
const errorMessages = {
  'number.base': '{{#label}} must be a number.',
  'number.integer': '{{#label}} must be an integer.',
  'string.empty': '{{#label}} cannot be empty.',
  'string.max': '{{#label}} should not exceed {{#limit}} characters.',
  'string.uri': '{{#label}} must be a valid URI.',
  'date.isoDate': '{{#label}} must be a valid ISO date.',
};

const vthreadsValidationSchema = Joi.object({
  id: Joi.number().integer().required()
    .messages({
      ...errorMessages,
    }),
  user_id: Joi.number().integer().required()
    .messages({
      ...errorMessages,
    }),
  VideoURL: Joi.string().uri().required()
    .messages({
      ...errorMessages,
    }),
  Title: Joi.string().max(255).required()
    .messages({
      ...errorMessages,
    }),
  Category: Joi.string().max(100).required()
    .messages({
      ...errorMessages,
    }),
  CreationDate: Joi.date().iso().required()
    .messages({
      ...errorMessages,
    }),
});

module.exports = {
  vthreadsValidationSchema,
};
