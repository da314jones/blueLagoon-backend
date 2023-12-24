const Joi = require('joi');

const errorMessages = {
  'string.base': '"{{#label}}" must be a string',
  'string.empty': '"{{#label}}" cannot be empty',
  'string.max': '"{{#label}}" must not exceed {{#limit}} characters',
  'boolean.base': '"{{#label}}" must be a boolean',
  'any.required': '"{{#label}}" is a required field',
};

const reviewsValidationSchema = Joi.object({
  id: Joi.number().integer().required().messages(errorMessages),
  user_id: Joi.number().integer().required().messages(errorMessages),
  eventOrServiceId: Joi.number().integer().required().messages(errorMessages),
  rating: Joi.number().integer().min(1).max(5).required().messages(errorMessages), // Assuming a 1-5 rating scale
  comment: Joi.string().max(65535).required().messages(errorMessages),
  reviewDate: Joi.date().iso().required().messages(errorMessages)
});

module.exports = { reviewsValidationSchema };
