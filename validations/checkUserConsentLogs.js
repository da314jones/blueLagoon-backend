const Joi = require('joi');

const userConsentLogsValidationSchema = Joi.object({
    id: Joi.number().integer().required(),
    user_id: Joi.number().integer().required(),
    document_id: Joi.number().integer().required(),
    consent_date: Joi.date().timestamp().required(),
    version: Joi.number().integer().min(1).required()
  });

  
  module.exports = {
    userConsentLogsValidationSchema
  }