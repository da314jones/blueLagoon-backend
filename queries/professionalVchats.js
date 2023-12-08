const Joi = require('joi');

const professionalVchatsSchema = Joi.object({
    id: Joi.number().integer().required(),
    Topic: Joi.string().max(255).required(),
    Speaker: Joi.string().max(100).required(),
    VideoURL: Joi.string().uri().required(),
    Date: Joi.date().iso().required(),
    Time: Joi.time().pattern(/^[0-2][0-9]:[0-5][0-9]$/).require(),
    ArchiveLink: Joi.string().uri().allow(null, ""),
    isLive: Joi.boolean().required(),
    Archived: Joi.boolean().required()
});

module.exports = {
    professionalVchatsSchema
}