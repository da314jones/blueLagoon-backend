const Joi = require('joi');

const emergencyContactsValidationSchema = Joi.object({
    id: Joi.number().integer().required(),
    user_id: Joi.number().integer().required(),
    Name: Joi.string().max(255).required(),
    ContactInfo: Joi.string().required(),
    Description: Joi.string().required(),
    Location: Joi.string().max(255).required()
  });
  

  module.exports = {
    emergencyContactsValidationSchema
  }