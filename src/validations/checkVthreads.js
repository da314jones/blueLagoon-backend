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
  user_id: Joi.number().integer().required().messages(errorMessages),
  title: Joi.string().max(255).required().messages(errorMessages),
  video_url: Joi.string().uri().required().messages(errorMessages),
  category: Joi.string().max(100).required().messages(errorMessages),
  creation_date: Joi.date().iso().required().messages(errorMessages)
});

module.exports = { vthreadsValidationSchema };