const Joi = require('joi');

const usersValidationSchema = Joi.object({
    username: Joi.string().max(255).required(),
    email: Joi.string().email().max(255).required(),
    password_hash: Joi.string().required(),
    date_of_birth: Joi.date().iso().required(),
    is_age_verified: Joi.boolean(),
    account_status: Joi.string().max(50),
    phone_number: Joi.string().max(15),
    profile_pic: Joi.string(),
    interests: Joi.string(),
    challenges: Joi.string(),
    experiences: Joi.string(),
    locations: Joi.string().max(100),
    join_date: Joi.date().iso(),
    role: Joi.string().max(50),
    last_login: Joi.date().timestamp()
});

module.exports = { usersValidationSchema };
