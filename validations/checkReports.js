const Joi = require('joi');

const errorMessages = {
  'number.base': '"{{#label}}" must be a number',
  'number.integer': '"{{#label}}" must be an integer',
  'string.base': '"{{#label}}" must be a string',
  'string.empty': '"{{#label}}" cannot be empty',
  'string.max': '"{{#label}}" must not exceed {{#limit}} characters',
  'date.base': '"{{#label}}" must be a valid date',
  'date.format': '"{{#label}}" must be in ISO date format YYYY-MM-DD',
  'any.required': '"{{#label}}" is a required field',
};

const reportsValidationSchema = Joi.object({
  id: Joi.number().integer().required().messages(errorMessages),
  reported_by_user_id: Joi.number().integer().required().messages(errorMessages),
  reported_user_id: Joi.number().integer().required().messages(errorMessages),
  Content: Joi.string().max(65535).required().messages(errorMessages),
  ReportDate: Joi.date().iso().required().messages(errorMessages),
});

module.exports = {
  reportsValidationSchema,
};
