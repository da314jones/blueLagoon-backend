const Joi = require('joi');

const reportsValidationSchema = Joi.object({
    id: Joi.number().integer().required(),
    reported_by_user_id: Joi.number().integer().required(),
    reported_user_id: Joi.number().integer().required(),
    Content: Joi.string().required(),
    ReportDate: Joi.date().timestamp().required()
  });
  

  module.exports = {
    reportsValidationSchema
  }