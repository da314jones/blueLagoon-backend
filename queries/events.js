const Joi = require('joi');

const eventsSchema = Joi.object({
    id: Joi.number().integer().required(),
    Title: Joi.string().max(255).required(),
    Description: Joi.string().required(),
    Location: Joi.string().max(100).required(),
    Category: Joi.string().max(100).required(),
    SignUpLink: Joi.string().uri().allow(null, ""),
    Date: Joi.date().iso().required(),
    Time: Joi.string().pattern(/^[0-2][0-9]:[0-5][0-9]$/).required()
});

module.exports = {
    eventsSchema
}