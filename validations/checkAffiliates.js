const Joi = require('joi');

// Centralized error messages object
const errorMessages = {
    'number.base': '"{{#label}}" must be a number',
    'number.integer': '"{{#label}}" must be an integer',
    'string.base': '"{{#label}}" must be a text',
    'string.max': '"{{#label}}" must not exceed 255 characters',
    'any.required': '"{{#label}}" is a required field'
};

const affiliatesValidationSchema = Joi.object({
    id: Joi.number().integer().required().messages(errorMessages),
    name: Joi.string().max(255).required().messages(errorMessages),
    serviceOrProduct: Joi.string().required().messages(errorMessages),
    discountDetails: Joi.string().required().messages(errorMessages),
    contactInfo: Joi.string().required().messages(errorMessages)
});

module.exports = {
  affiliatesValidationSchema,
};
