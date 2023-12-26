const db = require('../db/dbConfig');

const getAllUsers = async () => {
    return db.any("SELECT * FROM users");
};

const getUserById = async (user_id) => {
    return db.oneOrNone("SELECT * FROM users WHERE user_id = $1", user_id);
};

const createUser = async (user) => {
    return db.one(
        "INSERT INTO users (username, email, password_hash, date_of_birth, is_age_verified, account_status, phone_number, profile_pic, interests, challenges, experiences, locations, join_date, role, last_login) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *",
        [user.username, user.email, user.password_hash, user.date_of_birth, user.is_age_verified, user.account_status, user.phone_number, user.profile_pic, user.interests, user.challenges, user.experiences, user.locations, user.join_date, user.role, user.last_login]
    );
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser
};
