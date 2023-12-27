// passwordResetQueries.js

const db = require('../db/dbConfig');

const resetPassword = async (user_id, newPasswordHash) => {
    try {
        await db.none("UPDATE users SET password_hash = $1 WHERE user_id = $2", [newPasswordHash, user_id]);
    } catch (err) {
        console.error('Error resetting password:', err);
        throw err;
    }
};

module.exports = {
    resetPassword
};
