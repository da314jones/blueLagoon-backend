const Joi = require('joi');

const errorMessages = {
    'number.base': '"{{#label}}" must be a number',
    'number.integer': '"{{#label}}" must be an integer',
    'string.base': '"{{#label}}" must be text',
    'string.uri': '"{{#label}}" must be a valid URL',
    'date.base': '"{{#label}}" must be a valid date',
    'any.required': '"{{#label}}" is a required field'
};

const vchatValidationSchema = Joi.object({
    user_id: Joi.number().integer().required().messages(errorMessages),
    video_url: Joi.string().uri().required().messages(errorMessages),
    schedule_time: Joi.date().required().messages(errorMessages),
    duration: Joi.number().integer().required().messages(errorMessages),
    archive_link: Joi.string().uri().messages(errorMessages),
    start_time: Joi.date().required().messages(errorMessages),
    end_time: Joi.date().required().messages(errorMessages),
    archive_url: Joi.string().uri().required().messages(errorMessages)
}).required().messages(errorMessages);

module.exports = { vchatValidationSchema };
