const Joi = require('joi');

const errorMessages = {
    'number.base': '"{{#label}}" must be a number',
    'number.integer': '"{{#label}}" must be an integer',
    'string.base': '"{{#label}}" must be text',
    'string.max': '"{{#label}}" must not exceed {{#limit}} characters',
    'string.uri': '"{{#label}}" must be a valid URI',
    'any.required': '"{{#label}}" is a required field',
    'date.base': '"{{#label}}" must be a valid date',
    'date.format': '"{{#label}}" must be in YYYY-MM-DD format',
    'string.pattern.base': '"{{#label}}" must match the required pattern'
};

const eventsValidationSchema = Joi.object({
    id: Joi.number().integer().required().messages(errorMessages),
    title: Joi.string().max(255).required().messages(errorMessages),
    description: Joi.string().required().messages(errorMessages),
    location: Joi.string().max(100).required().messages(errorMessages),
    category: Joi.string().max(100).required().messages(errorMessages),
    signUpLink: Joi.string().uri().required().messages(errorMessages),
    date: Joi.date().iso().required().messages(errorMessages),
    time: Joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).required().messages(errorMessages)
});

module.exports = {
  eventsValidationSchema,
};
