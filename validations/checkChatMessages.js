const Joi = require('joi');

const errorMessages = {
    'number.base': '"{{#label}}" must be a number',
    'number.integer': '"{{#label}}" must be an integer',
    'string.base': '"{{#label}}" must be a string',
    'string.empty': '"{{#label}}" cannot be empty',
    'date.base': '"{{#label}}" must be a valid date',
    'any.required': '"{{#label}}" is a required field'
};

const chatMessagesValidationSchema = Joi.object({
    session_id: Joi.number().integer().required().messages(errorMessages),
    user_id: Joi.number().integer().required().messages(errorMessages),
    message: Joi.string().required().messages(errorMessages),
    timestamp: Joi.date().iso().required().messages(errorMessages)
});

module.exports = { chatMessagesValidationSchema };
