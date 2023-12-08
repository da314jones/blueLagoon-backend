const Joi = require('joi');

const errorLogsValidationSchema = Joi.object({
    id: Joi.number().integer().required(),
    user_id: Joi.number().integer().allow(null),
    error_type: Joi.string().max(50).required(),
    error_message: Joi.string().required(),
    error_time: Joi.date().timestamp().required(),
    additional_info: Joi.object().allow(null)
  });

  
  module.exports = {
    errorLogsValidationSchema
  }