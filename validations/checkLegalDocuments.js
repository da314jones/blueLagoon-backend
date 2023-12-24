const Joi = require('joi');

const errorMessages = {
  'number.base': '"{{#label}}" must be a number',
  'string.base': '"{{#label}}" must be text',
  'string.max': '"{{#label}}" must not exceed {{#limit}} characters',
  'number.integer': '"{{#label}}" must be an integer',
  'date.base': '"{{#label}}" must be a valid date',
  'date.format': '"{{#label}}" must be in YYYY-MM-DD format',
  'any.required': '"{{#label}}" is a required field',
};

const legalDocumentsValidationSchema = Joi.object({
  id: Joi.number().integer().required().messages(errorMessages),
  title: Joi.string().max(255).required().messages(errorMessages),
  content: Joi.string().required().messages(errorMessages),
  version: Joi.number().integer().required().messages(errorMessages),
  effective_date: Joi.date().iso().required().messages(errorMessages),
});

module.exports = {
  legalDocumentsValidationSchema,
};
