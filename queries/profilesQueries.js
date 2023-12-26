const db = require('../db/dbConfig');

const getAllProfiles = async () => {
    try {
        return await db.any("SELECT * FROM profiles");
    } catch (err) {
        console.error('Error fetching all profiles:', err);
        throw err;
    }
};

const getProfileById = async (profile_id) => {
    try {
        return await db.oneOrNone("SELECT * FROM profiles WHERE profile_id = $1", profile_id);
    } catch (err) {
        console.error(`Error fetching profile with ID ${profile_id}:`, err);
        throw err;
    }
};

const createProfile = async (profile) => {
    try {
        return await db.one(
            "INSERT INTO profiles (user_id, name, gender, profile_picture_url, bio, location) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [profile.user_id, profile.name, profile.gender, profile.profile_picture_url, profile.bio, profile.location]
        );
    } catch (err) {
        console.error('Error creating profile:', err);
        throw err;
    }
};

module.exports = {
    getAllProfiles,
    getProfileById,
    createProfile
};
