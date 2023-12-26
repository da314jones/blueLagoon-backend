const db = require('../db/dbConfig');

const getAllSecurityRecords = async () => {
    try {
        return await db.any("SELECT * FROM security");
    } catch (err) {
        console.error('Error fetching all security records:', err);
        throw err;
    }
};

const getSecurityRecordById = async (security_id) => {
    try {
        return await db.oneOrNone("SELECT * FROM security WHERE security_id = $1", security_id);
    } catch (err) {
        console.error(`Error fetching security record with ID ${security_id}:`, err);
        throw err;
    }
};

const createSecurityRecord = async (security) => {
    try {
        return await db.one(
            "INSERT INTO security (user_id, email_verified, phone_verified, phone_verification_code, two_factor_enabled, last_login) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [security.user_id, security.email_verified, security.phone_verified, security.phone_verification_code, security.two_factor_enabled, security.last_login]
        );
    } catch (err) {
        console.error('Error creating security record:', err);
        throw err;
    }
};

module.exports = {
    getAllSecurityRecords,
    getSecurityRecordById,
    createSecurityRecord
};
