const Joi = require('joi');

const errorMessages = {
  'number.base': '"{{#label}}" must be a number',
  'number.integer': '"{{#label}}" must be an integer',
  'string.base': '"{{#label}}" must be a string',
  'string.empty': '"{{#label}}" cannot be empty',
  'string.max': '"{{#label}}" must not exceed {{#limit}} characters',
  'string.uri': '"{{#label}}" must be a valid URI',
  'date.base': '"{{#label}}" must be a valid date',
  'date.format': '"{{#label}}" must be in ISO date format YYYY-MM-DD',
  'any.required': '"{{#label}}" is a required field',
};

const recommendationsValidationSchema = Joi.object({
  id: Joi.number().integer().required().messages(errorMessages),
  user_id: Joi.number().integer().required().messages(errorMessages),
  Title: Joi.string().max(255).required().messages(errorMessages),
  Description: Joi.string().max(65535).messages(errorMessages),
  Link: Joi.string().uri().messages(errorMessages),
  recommendedOn: Joi.date().iso().required().messages(errorMessages),
});

module.exports = {
  recommendationsValidationSchema
};
