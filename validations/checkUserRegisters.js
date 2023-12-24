const Joi = require('joi');

const errorMessages = {
    'number.base': '"{{#label}}" must be a number',
    'number.integer': '"{{#label}}" must be an integer',
    'string.base': '"{{#label}}" must be text',
    'string.email': '"{{#label}}" must be a valid email',
    'string.guid': '"{{#label}}" must be a valid UUID',
    'boolean.base': '"{{#label}}" must be a boolean',
    'date.base': '"{{#label}}" must be a valid date',
    'any.required': '"{{#label}}" is a required field'
};

const registrationsValidationSchema = Joi.object({
    user_id: Joi.number().integer().required().messages(errorMessages),
    email: Joi.string().email().required().messages(errorMessages),
    registration_started: Joi.date().iso().messages(errorMessages),
    initial_data: Joi.object().messages(errorMessages),
    registration_token: Joi.string().guid().messages(errorMessages),
    token_expiration: Joi.date().iso().messages(errorMessages),
    additional_info: Joi.string().messages(errorMessages),
    verification_process: Joi.string().messages(errorMessages),
    agree_to_terms_of_service: Joi.boolean().required().messages(errorMessages)
}).required().messages(errorMessages);

module.exports = { registrationsValidationSchema };
