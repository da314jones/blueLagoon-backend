const Joi = require('joi');

// Define the error messages for each validation rule
const errorMessages = {
  'number.base': '{{#label}} must be a number.',
  'number.integer': '{{#label}} must be an integer.',
  'string.empty': '{{#label}} cannot be empty.',
  'string.max': '{{#label}} should not exceed {{#limit}} characters.',
  'string.uri': '{{#label}} must be a valid URI.',
  'date.base': '{{#label}} must be a valid date in ISO format (YYYY-MM-DD).',
  'string.pattern.base': '{{#label}} must be in the format HH:MM (e.g., 14:30).',
  'boolean.base': '{{#label}} must be a boolean.',
};

const vthreadsValidationSchema = Joi.object({
  id: Joi.number().integer().required()
    .messages({
      ...errorMessages,
    }),
  Title: Joi.string().max(255).required()
    .messages({
      ...errorMessages,
    }),
  Description: Joi.string().max(500)
    .messages({
      ...errorMessages,
    }),
  Date: Joi.date().iso().required()
    .messages({
      ...errorMessages,
    }),
  Time: Joi.string().pattern(/^[0-2][0-9]:[0-5][0-9]$/).required()
    .messages({
      ...errorMessages,
    }),
  Host: Joi.string().max(100).required()
    .messages({
      ...errorMessages,
    }),
  Location: Joi.string().max(100)
    .messages({
      ...errorMessages,
    }),
  isLive: Joi.boolean().required()
    .messages({
      ...errorMessages,
    }),
  Archived: Joi.boolean().required()
    .messages({
      ...errorMessages,
    }),
});

module.exports = {
  vthreadsValidationSchema,
};
