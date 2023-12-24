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
  title: Joi.string().max(255).required().messages(errorMessages),
  type: Joi.string().max(50).required().messages(errorMessages),
  link: Joi.string().uri().required().messages(errorMessages),
  locationBased: Joi.boolean().required().messages(errorMessages),
  location: Joi.string().max(255).required().messages(errorMessages)
});

module.exports = {
   resourcesValidationSchema
};
