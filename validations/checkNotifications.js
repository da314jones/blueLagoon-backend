const Joi = require('joi');

const errorMessages = {
  'number.base': '"{{#label}}" must be a number',
  'number.integer': '"{{#label}}" must be an integer',
  'string.base': '"{{#label}}" must be text',
  'string.max': '"{{#label}}" must not exceed {{#limit}} characters',
  'string.valid': '"{{#label}}" must be a valid {{#valid}}',
  'date.base': '"{{#label}}" must be a valid date',
  'date.format': '"{{#label}}" must be in YYYY-MM-DD format',
  'any.required': '"{{#label}}" is a required field',
};

const notificationsValidationSchema = Joi.object({
  id: Joi.number().integer().required().messages(errorMessages),
  user_id: Joi.number().integer().required().messages(errorMessages),
  type: Joi.string().valid('alert', 'message').required().messages(errorMessages),
  message: Joi.string().max(255).required().messages(errorMessages),
  date: Joi.date().iso().required().messages(errorMessages),
});

module.exports = {
  notificationsValidationSchema,
};
