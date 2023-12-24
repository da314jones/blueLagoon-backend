const { all } = require('../controllers/userRegistrationsController');
const pool = require('../dbPool');

const getAllRegistrations = async () => {
    try {
        console.log("Executing query fetching all registrations");    
            const allRegistrations = await db.any("SELECT * FROM user_registrations");
            console.group("Query results:", allRegistrations)
            return allRegistrations;
        } catch(err) {
            console.error("Failed fetch all Professional VChat")
            return err
            }
};

const getRegistrationById = async (id) => {
    try {
    const oneRegistration = await db.one("SELECT * FROM user_registrations WHERE registration_id = $1", id);
    return oneRegistration;
        } catch(err) {
    return err
        }
};

const createRegistration = async (registration) => {
    try {
        const createdRegistration = await db.one("INSERT INTO user_registrations (user_id, email, registration_started, initial_data, registration_token, token_expiration, additional_info, verification_process, agree_to_terms_of_service) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *", [registration.user_id, registration.email, registration.registration_started, registration.initial_data, registration.registration_token, registration.token_expiration, registration.additional_info, registration.verification_process, registration.agree_to_terms_of_service]);
        return createdRegistration;
    } catch(err) {
        return err
}
    
};

const deleteRegistration = async (id) => {
    try {
    const deletedRegistration = await db.one("DELETE FROM user_registrations WHERE id=$1 RETURNING *", id); 
    return deletedRegistration;
} catch(err) {
    return err
}
};

const updateRegistration = async (id, registration) => {
    try {
    const { user_id, email, registration_started, initial_data, registration_token, token_expiration, additional_info, verification_process, agree_to_terms_of_service } = registration;
    const updatedRegistration = await pool.query("UPDATE user_registrations SET user_id=$1, email=$2, registration_started=$3, initial_data=$4, registration_token=$5, token_expiration=$6, additional_info=$7, verification_process=$8, agree_to_terms_of_service=$9 WHERE id=$10 RETURNING *", [user_id, email, registration_started, initial_data, registration_token, token_expiration, additional_info, verification_process, agree_to_terms_of_service, id]);
    return updatedRegistration;
} catch(err) {
    return err
}
};

module.exports = {
    getAllRegistrations,
    getRegistrationById,
    createRegistration,
    deleteRegistration,
    updateRegistration
};
