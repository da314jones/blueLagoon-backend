const Joi = require('joi');

const errorMessages = {
    'number.base': '"{{#label}}" must be a number',
    'number.integer': '"{{#label}}" must be an integer',
    'string.base': '"{{#label}}" must be text',
    'string.max': '"{{#label}}" must not exceed {{#limit}} characters',
    'any.required': '"{{#label}}" is a required field'
};

const emergencyContactsValidationSchema = Joi.object({
    id: Joi.number().integer().required().messages(errorMessages),
    user_id: Joi.number().integer().required().messages(errorMessages),
    Name: Joi.string().max(255).required().messages(errorMessages),
    ContactInfo: Joi.string().required().messages(errorMessages),
    Description: Joi.string().required().messages(errorMessages),
    Location: Joi.string().max(255).required().messages(errorMessages)
});

module.exports = {
  emergencyContactsValidationSchema,
};
