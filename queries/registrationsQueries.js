const db = require('../db/dbConfig');

const getAllRegistrations = async () => {
    return db.any("SELECT * FROM registrations");
};

const getRegistrationById = async (registration_id) => {
    return db.oneOrNone("SELECT * FROM registrations WHERE registration_id = $1", registration_id);
};

const createRegistration = async (registration) => {
    return db.one(
        "INSERT INTO registrations (user_id, email, registration_started, initial_data, registration_token, token_expiration, additional_info, verification_process, agree_to_terms_of_service) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
        [registration.user_id, registration.email, registration.registration_started, registration.initial_data, registration.registration_token, registration.token_expiration, registration.additional_info, registration.verification_process, registration.agree_to_terms_of_service]
    );
};

module.exports = {
    getAllRegistrations,
    getRegistrationById,
    createRegistration
};
