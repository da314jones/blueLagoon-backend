const pool = require('../dbPool');

const getAllProfiles = async () => {
    const result = await pool.query("SELECT * FROM profiles");
    return result.rows;
};

const getProfileById = async (profile_id) => {
    const result = await pool.query("SELECT * FROM profiles WHERE profile_id = $1", [profile_id]);
    return result.rows[0];
};

const createProfile = async (profile) => {
    const { user_id, name, gender, profile_picture_url, bio, location } = profile;
    const result = await pool.query("INSERT INTO profiles (user_id, name, gender, profile_picture_url, bio, location) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [user_id, name, gender, profile_picture_url, bio, location]);
    return result.rows[0];
};

const deleteProfile = async (profile_id) => {
    const result = await pool.query("DELETE FROM profiles WHERE profile_id = $1 RETURNING *", [profile_id]);
    return result.rows[0];
};

const updateProfile = async (profile_id, profile) => {
    const { user_id, name, gender, profile_picture_url, bio, location } = profile;
    const result = await pool.query("UPDATE profiles SET user_id = $1, name = $2, gender = $3, profile_picture_url = $4, bio = $5, location = $6 WHERE profile_id = $7 RETURNING *", [user_id, name, gender, profile_picture_url, bio, location, profile_id]);
    return result.rows[0];
};

module.exports = {
    getAllProfiles,
    getProfileById,
    createProfile,
    deleteProfile,
    updateProfile
};
