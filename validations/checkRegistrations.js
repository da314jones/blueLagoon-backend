const Joi = require('joi');

const registrationsValidationSchema = Joi.object({
    user_id: Joi.number().integer().required(),
    email: Joi.string().email().required(),
    registration_started: Joi.date().timestamp().required(),
    initial_data: Joi.object(),
    registration_token: Joi.string().guid({ version: ['uuidv4'] }),
    token_expiration: Joi.date().timestamp(),
    additional_info: Joi.string(),
    verification_process: Joi.string(),
    agree_to_terms_of_service: Joi.boolean().required()
});

module.exports = { registrationsValidationSchema };
