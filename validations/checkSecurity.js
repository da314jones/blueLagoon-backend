const Joi = require('joi');

const securityValidationSchema = Joi.object({
    user_id: Joi.number().integer().required(),
    email_verified: Joi.boolean(),
    phone_verified: Joi.boolean(),
    phone_verification_code: Joi.string().length(6),
    two_factor_enabled: Joi.boolean(),
    last_login: Joi.date().timestamp()
});

module.exports = { securityValidationSchema };
