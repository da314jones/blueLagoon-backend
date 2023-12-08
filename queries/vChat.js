const Joi = require('joi');

const vChatSchema = Joi.object({
  id: Joi.number().integer().required(),
  user_id: Joi.number().integer().required(),
  VideoURL: Joi.string().uri().required(),
  scheduleTime: Joi.date().required()
    .message({
      'date.base': 'Invalid date format',
      'any.required': 'Schedule time is required'
    }),
  Duration: Joi.number().integer().min(1).required()
    .message({
      'number.base': 'Duration must be a number',
      'number.integer': 'Duration must be an integer',
      'number.min': 'Duration must be at least 1 minute',
      'any.required': 'Duration is required'
    }),
  ArchiveLink: Joi.string().uri().allow(null, ""),
  StartTime: Joi.date().timestamp().allow(null),
  EndTime: Joi.date().timestamp().allow(null),
  ArchiveURL: Joi.string().uri().allow(null, "")
});


module.exports = {
  vChatSchema
};