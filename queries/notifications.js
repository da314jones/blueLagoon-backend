const Joi = require('joi');

const notificationsSchema = Joi.object({
    id: Joi.number().integer().required(),
    user_id: Joi.number().integer().required(),
    Type: Joi.string().max(50).required(),
    Message: Joi.string().required(),
    Date: Joi.date().timestamp().required()
});

module.exports = {
    notificationsSchema
}