const Joi = require('joi');

const errorMessages = {
    'number.base': '"{{#label}}" must be a number',
    'number.integer': '"{{#label}}" must be an integer',
    'string.base': '"{{#label}}" must be text',
    'string.max': '"{{#label}}" must not exceed 100 characters',
    'string.uri': '"{{#label}}" must be a valid URL',
    'any.required': '"{{#label}}" is a required field'
};

const profileValidationSchema = Joi.object({
    user_id: Joi.number().integer().required().messages(errorMessages),
    name: Joi.string().max(100).required().messages(errorMessages),
    gender: Joi.string().max(50).required().messages(errorMessages),
    profile_picture_url: Joi.string().uri().messages(errorMessages),
    bio: Joi.string().messages(errorMessages),
    location: Joi.string().max(100).messages(errorMessages)
}).required().messages(errorMessages);

module.exports = { profileValidationSchema };
