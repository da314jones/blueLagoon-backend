const pool = require('../dbPool'); // Replace with your actual DB pool configuration

const getAllUsers = async () => {
    try {
        const allUsers = await pool.query("SELECT * FROM users");
        return allUsers.rows;
    } catch (err) {
        console.error('Error fetching all users:', err);
        throw err;
    }
};

const getUserById = async (id) => {
    try {
        const user = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
        return user.rows[0];
    } catch (err) {
        console.error('Error fetching user by ID:', err);
        throw err;
    }
};

const createUser = async (user) => {
    const { email, hashed_password, date_of_birth, is_age_verified, account_status, phone_number, profile_pic, interests, challenges, experiences, locations, join_date, role } = user;
    try {
        const newUser = await pool.query("INSERT INTO users (email, hashed_password, date_of_birth, is_age_verified, account_status, phone_number, profile_pic, interests, challenges, experiences, locations, join_date, role) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *", [email, hashed_password, date_of_birth, is_age_verified, account_status, phone_number, profile_pic, interests, challenges, experiences, locations, join_date, role]);
        return newUser.rows[0];
    } catch (err) {
        console.error('Error creating new user:', err);
        throw err;
    }
};

const deleteUser = async (id) => {
    try {
        const deletedUser = await pool.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);
        return deletedUser.rows[0];
    } catch (err) {
        console.error('Error deleting user:', err);
        throw err;
    }
};

const updateUser = async (id, user) => {
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

    try {
        const query = `
            UPDATE users
            SET email = $1,
                hashed_password = $2,
                date_of_birth = $3,
                is_age_verified = $4,
                account_status = $5,
                phone_number = $6,
                profile_pic = $7,
                interests = $8,
                challenges = $9,
                experiences = $10,
                locations = $11,
                join_date = $12,
                role = $13
            WHERE id = $14
            RETURNING *;
        `;

        const values = [
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
            role,
            id
        ];

        const updatedUser = await pool.query(query, values);
        return updatedUser.rows[0];
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
