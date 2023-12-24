const db = require('../db/dbConfig'); // Replace with your actual DB pool configuration

const getAllUsers = async () => {
    try {
        console.log("Executing query fetching all users")
        const allUsers = await db.any("SELECT * FROM users");
        console.log("Query results:", allUsers);
        return allUsers;
    } catch (err) {
        console.error('Error fetching all users:', err);
        throw err;
    }
};

const getUserById = async (id) => {
    try {
        const oneUser = await db.one("SELECT * FROM users WHERE id = $1", id);
        return oneUser;
    } catch (err) {
        console.error('Error fetching user by ID:', err);
        throw err;
    }
};

const createUser = async (user) => {
    try {
        const createdUser = await db.one("INSERT INTO users (email, hashed_password, date_of_birth, is_age_verified, account_status, phone_number, profile_pic, interests, challenges, experiences, locations, join_date, role) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *", [user.email, user.hashed_password, user.date_of_birth, user.is_age_verified, user.account_status, user.phone_number, user.profile_pic, user.interests, user.challenges, user.experiences, user.locations, user.join_date, role]);
        return createdUser;
    } catch (err) {
        console.error('Error creating new user:', err);
        throw err;
    }
};

const deleteUser = async (id) => {
    try {
        const deletedUser = await db.one("DELETE FROM users WHERE id=$1 RETURNING *", id);
        return deletedUser;
    } catch (err) {
        console.error('Error deleting user:', err);
        throw err;
    }
};

const updateUser = async (id, user) => {
    try {
    const {
        email,
        hashed_password,
        date_of_birth,
        is_age_verified,
        account_status,
        phone_number,
        profile_pic,
        interests,
        challenges,
        experiences,
        locations,
        join_date,
        role
    } = user;
        const updatedUser = await db.one("UPDATE users SET email=$1, hashed_password=$2, date_of_birth=$3, is_age_verified=$4, account_status=$5, phone_number=$6, profile_pic=$7,             interests=$8, challenges=$9,              experiences=$10, locations=$11,               join_date=$12, role=$13, WHERE id=$14,           RETURNING *", [
            email,
            hashed_password,
            date_of_birth,
            is_age_verified,
            account_status,
            phone_number,
            profile_pic,
            interests,
            challenges,
            experiences,
            locations,
            join_date,
            role, id])

        return updatedUser;
    } catch (err) {
        console.error('Error updating user:', err);
        throw err;
    }
};


module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    deleteUser,
    updateUser
};
