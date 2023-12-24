// checkProfessionalVthreads.js

const Joi = require('joi');

const errorMessages = {
  'string.base': '"{{#label}}" must be text',
  'string.max': '"{{#label}}" must not exceed {{#limit}} characters',
  'string.uri': '"{{#label}}" must be a valid URI',
  'date.base': '"{{#label}}" must be a valid date',
  'date.format': '"{{#label}}" must be in YYYY-MM-DD format',
  'time.base': '"{{#label}}" must be a valid time',
  'time.format': '"{{#label}}" must be in HH:mm:ss format',
  'boolean.base': '"{{#label}}" must be a boolean',
  'any.required': '"{{#label}}" is a required field',
};

const professionalVthreadsValidationSchema = Joi.object({
  id: Joi.number().integer().required().messages(errorMessages),
  topic: Joi.string().max(255).required().messages(errorMessages),
  creator: Joi.string().max(100).required().messages(errorMessages),
  video_URL: Joi.string().uri().required().messages(errorMessages),
  date: Joi.date().iso().required().messages(errorMessages),
  time: Joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).required().messages(errorMessages),
  archived: Joi.boolean().required().messages(errorMessages),
});

module.exports = {
  professionalVthreadsValidationSchema,
};
