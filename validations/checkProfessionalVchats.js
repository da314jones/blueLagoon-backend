const Joi = require('joi');

const professionalVchatsValidationSchema = Joi.object({
    id: Joi.number().integer().required(),
    Topic: Joi.string().max(255).required(),
    Speaker: Joi.string().max(100).required(),
    VideoURL: Joi.string().uri().required(),
    Date: Joi.date().iso().required(),
    Time: Joi.string().pattern(/^[0-2][0-9]:[0-5][0-9]$/).required(),
    ArchiveLink: Joi.string().uri().allow(null, ''),
    isLive: Joi.boolean().required(),
    Archived: Joi.boolean().required()
  });

  
  module.exports = {
    professionalVchatsValidationSchema
  }