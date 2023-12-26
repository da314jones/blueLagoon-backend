const Joi = require('joi');

const groupsValidationSchema = Joi.object({
    group_name: Joi.string().max(100).required(),
    description: Joi.string().required(),
    creation_date: Joi.date().iso().required()
});

module.exports = { groupsValidationSchema };
