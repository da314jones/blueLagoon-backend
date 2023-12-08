const Joi = require('joi');

const groupsSchema = Joi.object({
    id: Joi.number().integer().required(),
    GroupName: Joi.string().mqx(100).required(),
    Description: Joi.string().required(),
    CreationDate: Joi.date().iso().required()
});

module.exports = {
    groupsSchema
}