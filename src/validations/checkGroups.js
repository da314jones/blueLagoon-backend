const Joi = require('joi');

const errorMessages = {
  'number.base': '"{{#label}}" must be a number',
  'number.integer': '"{{#label}}" must be an integer',
  'date.base': '"{{#label}}" must be a valid date',
  'date.format': '"{{#label}}" must be in ISO date format YYYY-MM-DD',
  'any.required': '"{{#label}}" is a required field',
};

const groupsValidationSchema = Joi.object({
  id: Joi.number().integer().required().messages(errorMessages),
  GroupName: Joi.string().max(100).required().messages(errorMessages),
  Description: Joi.string().max(65535).messages(errorMessages),
  CreationDate: Joi.date().iso().required().messages(errorMessages),
});

module.exports = {
  groupsValidationSchema,
};
