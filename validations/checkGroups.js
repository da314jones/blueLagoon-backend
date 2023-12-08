const Joi = require('joi');

const groupsValidationSchema = Joi.object({
    id: Joi.number().integer().required(),
    GroupName: Joi.string().max(100).required(),
    Description: Joi.string().required(),
    CreationDate: Joi.date().iso().required()
  });

  
  module.exports = {
    groupsValidationSchema
  }