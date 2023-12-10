const pool = require('../dbPool');

const getAllUserSecurity = async () => {
    const result = await pool.query("SELECT * FROM user_security");
    return result.rows;
};

const getUserSecurityById = async (security_id) => {
    const result = await pool.query("SELECT * FROM user_security WHERE security_id = $1", [security_id]);
    return result.rows[0];
};

const createUserSecurity = async (userSecurity) => {
    const { user_id, email_verified, phone_verified, phone_verification_code, two_factor_enabled, last_login } = userSecurity;
    const result = await pool.query("INSERT INTO user_security (user_id, email_verified, phone_verified, phone_verification_code, two_factor_enabled, last_login) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [user_id, email_verified, phone_verified, phone_verification_code, two_factor_enabled, last_login]);
    return result.rows[0];
};

const deleteUserSecurity = async (security_id) => {
    const result = await pool.query("DELETE FROM user_security WHERE security_id = $1 RETURNING *", [security_id]);
    return result.rows[0];
};

const updateUserSecurity = async (security_id, userSecurity) => {
    const { user_id, email_verified, phone_verified, phone_verification_code, two_factor_enabled, last_login } = userSecurity;
    const result = await pool.query("UPDATE user_security SET user_id = $1, email_verified = $2, phone_verified = $3, phone_verification_code = $4, two_factor_enabled = $5, last_login = $6 WHERE security_id = $7 RETURNING *", [user_id, email_verified, phone_verified, phone_verification_code, two_factor_enabled, last_login, security_id]);
    return result.rows[0];
};

module.exports = {
    getAllUserSecurity,
    getUserSecurityById,
    createUserSecurity,
    deleteUserSecurity,
    updateUserSecurity
};
