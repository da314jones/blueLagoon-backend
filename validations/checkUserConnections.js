const Joi = require('joi');

const userConnectionsValidationSchema = Joi.object({
    id: Joi.number().integer().required(),
    user1_id: Joi.number().integer().required(),
    user2_id: Joi.number().integer().required(),
    ConnectionOn: Joi.date().timestamp().required()
  });

  
  module.exports = {
    userConnectionsValidationSchema
  }