const Joi = require('joi');

const errorMessages = {
    'number.base': '"{{#label}}" must be a number',
    'number.integer': '"{{#label}}" must be an integer',
    'string.base': '"{{#label}}" must be a text',
    'string.max': '"{{#label}}" must not exceed 100 characters',
    'any.required': '"{{#label}}" is a required field'
};

const profilesValidationSchema = Joi.object({
    profile_id: Joi.number().integer().messages(errorMessages),
    user_id: Joi.number().integer().required().messages(errorMessages),
    name: Joi.string().max(100).required().messages(errorMessages),
    gender: Joi.string().max(50).required().messages(errorMessages),
    profile_picture_url: Joi.string().uri().required().messages(errorMessages),
    bio: Joi.string().max(255).messages(errorMessages),
    location: Joi.string().max(100).messages(errorMessages)
});

module.exports = {
    profilesValidationSchema
};
