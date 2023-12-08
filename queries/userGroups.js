const Joi = require('joi');

const userGroupsSchema = Joi.object({
    id: Joi.number().integer().required(),
    user_is: Joi().number().integer().require(),
    group_id: Joi.number().integer().required(),
    JoinDate: Joi.date().iso().required()
});

module.exports = {
    userGroupsSchema
}