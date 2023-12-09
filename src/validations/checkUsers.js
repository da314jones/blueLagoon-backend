const Joi = require('joi');

const errorMessages = {
  'number.base': '"{{#label}}" must be a number',
  'number.integer': '"{{#label}}" must be an integer',
  'string.base': '"{{#label}}" must be a string',
  'string.email': '"{{#label}}" must be a valid email',
  'string.empty': '"{{#label}}" cannot be empty',
  'string.max': '"{{#label}}" must not exceed {{#limit}} characters',
  'string.uri': '"{{#label}}" must be a valid URI',
  'date.base': '"{{#label}}" must be a valid date',
  'date.format': '"{{#label}}" must be in ISO date format YYYY-MM-DD',
  'any.required': '"{{#label}}" is a required field',
};

const usersValidationSchema = Joi.object({
  id: Joi.number().integer().required().messages(errorMessages),
  role: Joi.string().max(50).required().messages(errorMessages),
  Email: Joi.string().email().max(255).required().messages(errorMessages),
  Password: Joi.string().max(255).required().messages(errorMessages),
  ProfilePic: Joi.string().uri().allow('').messages(errorMessages),
  Interests: Joi.string().allow('').messages(errorMessages),
  Challenges: Joi.string().allow('').messages(errorMessages),
  Experiences: Joi.string().allow('').messages(errorMessages),
  Locations: Joi.string().max(100).allow('').messages(errorMessages),
  JoinDate: Joi.date().iso().required().messages(errorMessages)
});

module.exports = { usersValidationSchema };
