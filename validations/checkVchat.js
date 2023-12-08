const Joi = require('joi');

const vchatValidationSchema = Joi.object({
  id: Joi.number().integer().required(),
  user_id: Joi.number().integer().required(),
  VideoURL: Joi.string().uri().required(),
  ScheduleTime: Joi.date().timestamp().required(),
  Duration: Joi.number().integer().min(1).required(),
  ArchiveLink: Joi.string().uri().allow(null, ''),
  StartTime: Joi.date().timestamp().allow(null),
  EndTime: Joi.date().timestamp().allow(null),
  ArchiveURL: Joi.string().uri().allow(null, '')
});


module.exports = {
    vchatValidationSchema
}