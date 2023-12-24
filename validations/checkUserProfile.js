const Joi = require('joi');

const profileValidationSchema = Joi.object({
    user_id: Joi.number().integer().required(),
    name: Joi.string().max(100).required(),
    gender: Joi.string().max(50).required(),
    profile_picture_url: Joi.string().uri().allow(null, ''), // Allowing null and empty string
    bio: Joi.string().allow(null, ''), // Allowing null and empty string
    location: Joi.string().max(100).allow(null, '') // Allowing null and empty string
});

module.exports = { profileValidationSchema };
