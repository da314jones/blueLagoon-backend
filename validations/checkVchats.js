const Joi = require('joi');

const vchatsValidationSchema = Joi.object({
    host_user_id: Joi.number().integer().required(),
    video_url: Joi.string().uri().required(),
    schedule_time: Joi.date().iso(),
    duration: Joi.number().integer(),
    archive_link: Joi.string().uri(),
    start_time: Joi.date().iso(),
    end_time: Joi.date().iso(),
    archive_url: Joi.string().uri()
});

module.exports = vchatsValidationSchema;
