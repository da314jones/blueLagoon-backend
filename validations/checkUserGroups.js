const Joi = require('joi');

const userGroupsValidationSchema = Joi.object({
    user_id: Joi.number().integer().required(),
    group_id: Joi.number().integer().required(),
    join_date: Joi.date().iso().required()
});

module.exports = { userGroupsValidationSchema };
