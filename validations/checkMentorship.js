const Joi = require('joi');

const mentorshipValidationSchema = Joi.object({
    id: Joi.number().integer().required(),
    mentor_id: Joi.number().integer().required(),
    mentee_id: Joi.number().integer().required(),
    StartDate: Joi.date().iso().required(),
    Notes: Joi.string().allow(null, '')
  });

  
  module.exports = {
    mentorshipValidationSchema
  }