const Joi = require('joi');

const vchatsValidationSchema = Joi.object({
    id: Joi.number().integer(), // 'id' is not required when creating a new record.
    opentok_session_id: Joi.string().required(),
    session_name: Joi.string().allow(null), // Allowing null as seen in some responses.
    created_at: Joi.date().iso().required(),
    updated_at: Joi.date().iso().required(),
    status: Joi.string().valid('active', 'inactive').required(),
    duration: Joi.number().integer().required(),
    session_type: Joi.string().valid('group', 'individual').required(),
    host_id: Joi.string().required(),
    recording_status: Joi.string().valid('started', 'stopped').required(),
});

module.exports = { vchatsValidationSchema };
