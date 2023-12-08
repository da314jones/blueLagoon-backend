const Joi = require('joi');

const legalDocumentsValidationSchema = Joi.object({
    id: Joi.number().integer().required(),
    title: Joi.string().max(255).required(),
    content: Joi.string().required(),
    version: Joi.number().integer().min(1).required(),
    effective_date: Joi.date().iso().required()
  });
  

  module.exports = {
    legalDocumentsValidationSchema
  }