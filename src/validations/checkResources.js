const Joi = require('joi');

const errorMessages = {
  'string.base': '"{{#label}}" must be a string',
  'string.empty': '"{{#label}}" cannot be empty',
  'string.max': '"{{#label}}" must not exceed {{#limit}} characters',
  'boolean.base': '"{{#label}}" must be a boolean',
  'any.required': '"{{#label}}" is a required field',
};

const resourcesValidationSchema = Joi.object({
  id: Joi.number().integer().required().messages(errorMessages),
  Title: Joi.string().max(255).required().messages(errorMessages),
  Type: Joi.string().max(50).required().messages(errorMessages),
  Link: Joi.string().uri().required().messages(errorMessages),
  LocationBased: Joi.boolean().required().messages(errorMessages),
  Location: Joi.string().max(255).required().messages(errorMessages)
});

module.exports = {
   resourcesValidationSchema
};
