const Joi = require('joi');

const affiliatesValidationSchema = Joi.object({
    id: Joi.number().integer().required(),
    Name: Joi.string().max(255).required(),
    ServiceOrProduct: Joi.string().required(),
    DiscountDetails: Joi.string().required(),
    ContactInfo: Joi.string().required()
  });

  
  module.exports = {
    affiliatesValidationSchema
  }