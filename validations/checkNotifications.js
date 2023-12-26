const Joi = require('joi');

const notificationsValidationSchema = Joi.object({
    user_id: Joi.number().integer().required(),
    type: Joi.string().max(50).required(),
    message: Joi.string().required(),
    date: Joi.date().iso().required()
});

module.exports = { notificationsValidationSchema };
