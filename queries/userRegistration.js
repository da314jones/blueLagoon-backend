const pool = require('../dbPool');

const getAllRegistrations = async () => {
    const result = await pool.query("SELECT * FROM user_registrations");
    return result.rows;
};

const getRegistrationById = async (registration_id) => {
    const result = await pool.query("SELECT * FROM user_registrations WHERE registration_id = $1", [registration_id]);
    return result.rows[0];
};

const createRegistration = async (registration) => {
    const { user_id, email, registration_started, initial_data, registration_token, token_expiration, additional_info, verification_process, agree_to_terms_of_service } = registration;
    const result = await pool.query("INSERT INTO user_registrations (user_id, email, registration_started, initial_data, registration_token, token_expiration, additional_info, verification_process, agree_to_terms_of_service) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *", [user_id, email, registration_started, initial_data, registration_token, token_expiration, additional_info, verification_process, agree_to_terms_of_service]);
    return result.rows[0];
};

const deleteRegistration = async (registration_id) => {
    const result = await pool.query("DELETE FROM user_registrations WHERE registration_id = $1 RETURNING *", [registration_id]);
    return result.rows[0];
};

const updateRegistration = async (registration_id, registration) => {
    const { user_id, email, registration_started, initial_data, registration_token, token_expiration, additional_info, verification_process, agree_to_terms_of_service } = registration;
    const result = await pool.query("UPDATE user_registrations SET user_id = $1, email = $2, registration_started = $3, initial_data = $4, registration_token = $5, token_expiration = $6, additional_info = $7, verification_process = $8, agree_to_terms_of_service = $9 WHERE registration_id = $10 RETURNING *", [user_id, email, registration_started, initial_data, registration_token, token_expiration, additional_info, verification_process, agree_to_terms_of_service, registration_id]);
    return result.rows[0];
};

module.exports = {
    getAllRegistrations,
    getRegistrationById,
    createRegistration,
    deleteRegistration,
    updateRegistration
};
