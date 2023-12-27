const db = require('../db/dbConfig'); 

// Query to reset a user's password
const resetPassword = async (userId, newPasswordHash) => {
    const query = 'UPDATE users SET password_hash = $1 WHERE user_id = $2';
    await db.query(query, [newPasswordHash, userId]);
};

// Query to get user by email
const getUserByEmail = async (email) => {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await db.query(query, [email]);
    return result.rows[0];
};

module.exports = {
    resetPassword,
    getUserByEmail
};
