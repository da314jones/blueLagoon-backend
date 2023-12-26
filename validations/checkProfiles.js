const Joi = require('joi');

const profilesValidationSchema = Joi.object({
    user_id: Joi.number().integer().required(),
    name: Joi.string().max(100),
    gender: Joi.string().max(50),
    profile_picture_url: Joi.string().uri(),
    bio: Joi.string(),
    location: Joi.string().max(100)
});

module.exports = { profilesValidationSchema };
