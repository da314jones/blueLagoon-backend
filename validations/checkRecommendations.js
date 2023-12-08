const Joi = require('joi');

// Define the error messages for each validation rule
const errorMessages = {
  'number.base': '{{#label}} must be a number.',
  'number.integer': '{{#label}} must be an integer.',
  'string.empty': '{{#label}} cannot be empty.',
  'string.max': '{{#label}} should not exceed {{#limit}} characters.',
  'string.uri': '{{#label}} must be a valid URI.',
  'date.timestamp.base': '{{#label}} must be a valid timestamp.',
};

const recommendationsValidationSchema = Joi.object({
  id: Joi.number().integer().required()
    .messages({
      ...errorMessages,
    }),
  user_id: Joi.number().integer().required()
    .messages({
      ...errorMessages,
    }),
  Title: Joi.string().max(255).required()
    .messages({
      ...errorMessages,
    }),
  Description: Joi.string().required()
    .messages({
      ...errorMessages,
    }),
  Link: Joi.string().uri().required()
    .messages({
      ...errorMessages,
    }),
  recommendedOn: Joi.date().timestamp().required()
    .messages({
      ...errorMessages,
    }),
});

module.exports = {
  recommendationsValidationSchema,
};
