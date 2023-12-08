const Joi = require('joi');

const userGroupsValidationSchema = Joi.object({
    id: Joi.number().integer().required(),
    user_id: Joi.number().integer().required(),
    group_id: Joi.number().integer().required(),
    JoinDate: Joi.date().iso().required()
  });

  
  module.exports = {
    userGroupsValidationSchema
  }