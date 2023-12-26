const Joi = require('joi');

const vthreadsValidationSchema = Joi.object({
    host_user_id: Joi.number().integer().required(),
    title: Joi.string().max(255).required(),
    description: Joi.string().required(),
    video_url: Joi.string().uri().required(),
    scheduled_time: Joi.date().iso(),
    duration: Joi.number().integer().required(),
    created_at: Joi.date().iso(),
    updated_at: Joi.date().iso()
});

module.exports = { vthreadsValidationSchema };
