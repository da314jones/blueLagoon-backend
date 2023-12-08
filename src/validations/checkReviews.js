const Joi = require('joi');

// Define the error messages for each validation rule
const errorMessages = {
  'number.base': '{{#label}} must be a number.',
  'number.integer': '{{#label}} must be an integer.',
  'number.min': '{{#label}} must be at least {{#limit}}.',
  'number.max': '{{#label}} must not exceed {{#limit}}.',
  'string.empty': '{{#label}} cannot be empty.',
  'string.max': '{{#label}} should not exceed {{#limit}} characters.',
  'date.timestamp.base': '{{#label}} must be a valid timestamp.',
};

const reviewsValidationSchema = Joi.object({
  id: Joi.number().integer().required()
    .messages({
      ...errorMessages,
    }),
  user_id: Joi.number().integer().required()
    .messages({
      ...errorMessages,
    }),
  EventOrServiceId: Joi.number().integer().required()
    .messages({
      ...errorMessages,
    }),
  Rating: Joi.number().integer().min(1).max(5).required()
    .messages({
      ...errorMessages,
    }),
  Comment: Joi.string().required()
    .messages({
      ...errorMessages,
    }),
  ReviewDate: Joi.date().timestamp().required()
    .messages({
      ...errorMessages,
    }),
});

module.exports = {
  reviewsValidationSchema,
};
