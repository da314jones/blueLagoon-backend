const Joi = require('joi');

const errorMessages = {
  'number.base': '"{{#label}}" must be a number',
  'number.integer': '"{{#label}}" must be an integer',
  'number.min': '"{{#label}}" must be greater than or equal to {{#limit}}',
  'string.base': '"{{#label}}" must be a string',
  'string.uri': '"{{#label}}" must be a valid URI',
  'string.empty': '"{{#label}}" cannot be empty',
  'date.base': '"{{#label}}" must be a valid date',
  'date.isoDate': '"{{#label}}" must be in ISO date format',
  'any.required': '"{{#label}}" is a required field',
};

const vthreadsValidationSchema = Joi.object({
  id: Joi.number().integer().required().messages(errorMessages),
  user_id: Joi.number().integer().required().messages(errorMessages),
  VideoURL: Joi.string().uri().required().messages(errorMessages),
  Title: Joi.string().max(255).required().messages(errorMessages),
  Category: Joi.string().max(100).required().messages(errorMessages),
  CreationDate: Joi.date().iso().required().messages(errorMessages)
});

module.exports = { vthreadsValidationSchema };
