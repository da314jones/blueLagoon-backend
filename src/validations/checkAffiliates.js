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
    Name: Joi.string().max(255).required().messages(errorMessages),
    ServiceOrProduct: Joi.string().required().messages(errorMessages),
    DiscountDetails: Joi.string().required().messages(errorMessages),
    ContactInfo: Joi.string().required().messages(errorMessages)
});

module.exports = {
  affiliatesValidationSchema,
};
