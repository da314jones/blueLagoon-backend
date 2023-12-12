const Joi = require('joi');

const errorMessages = {
    'number.base': '"{{#label}}" must be a number',
    'number.integer': '"{{#label}}" must be an integer',
    'boolean.base': '"{{#label}}" must be a boolean',
    'string.base': '"{{#label}}" must be text',
    'string.max': '"{{#label}}" must not exceed 6 characters',
    'date.base': '"{{#label}}" should be a valid date',
    'any.required': '"{{#label}}" is a required field'
};

const userSecurityValidationSchema = Joi.object({
    user_id: Joi.number().integer().required().messages(errorMessages),
    email_verified: Joi.boolean().messages(errorMessages),
    phone_verified: Joi.boolean().messages(errorMessages),
    phone_verification_code: Joi.string().max(6).messages(errorMessages),
    two_factor_enabled: Joi.boolean().messages(errorMessages),
    last_login: Joi.date().messages(errorMessages)
}).required().messages(errorMessages);

module.exports = { userSecurityValidationSchema };
