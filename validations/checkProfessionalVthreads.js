const Joi = require('joi');

const professionalVthreadsValidationSchema = Joi.object({
    topic: Joi.string().max(255).required(),
    creator: Joi.string().max(255).required(),
    industry: Joi.string().max(255).required(),
    credentials: Joi.string().required(),
    date: Joi.date().iso().required(),
    time: Joi.string().required(),
    discussion_url: Joi.string().uri().required(),
    is_active: Joi.boolean().required(),
    archived: Joi.boolean().required(),
    archive_link: Joi.string().uri().allow(null)
});

module.exports = { professionalVthreadsValidationSchema };
