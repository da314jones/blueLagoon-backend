const Joi = require('joi');

const errorMessages = {
  'string.base': '"{{#label}}" must be a string',
  'string.empty': '"{{#label}}" cannot be empty',
  'string.max': '"{{#label}}" must not exceed {{#limit}} characters',
  'boolean.base': '"{{#label}}" must be a boolean',
  'any.required': '"{{#label}}" is a required field',
};

const socialMediaAccountsValidationSchema = Joi.object({
  id: Joi.number().integer().required().messages(errorMessages),
  user_id: Joi.number().integer().required().messages(errorMessages),
  SocialMediaPlatform: Joi.string().max(50).required().messages(errorMessages),
  SocialMediaID: Joi.string().max(255).required().messages(errorMessages),
  ProfileURL: Joi.string().uri().required().messages(errorMessages),
  ConnectedOn: Joi.date().iso().required().messages(errorMessages)
});

module.exports = { socialMediaAccountsValidationSchema };
