const Joi = require('joi');

const resourcesValidationSchema = Joi.object({
    id: Joi.number().integer().required(),
    Title: Joi.string().max(255).required(),
    Type: Joi.string().max(50).required(),
    Link: Joi.string().uri().required(),
    LocationBased: Joi.boolean().required(),
    Location: Joi.string().max(255).when('LocationBased', { is: true, then: Joi.required() })
  });

  
  module.exports = {
    resourcesValidationSchema
  }