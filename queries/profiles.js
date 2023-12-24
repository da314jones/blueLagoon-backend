const db = require('../db/dbConfig.js');

const getAllProfiles = async () => {
    try {
        const allProfiles = await db.any("SELECT * FROM profiles");
        return allProfiles;
    } catch(err) {
        console.error('Error fetching all profiles:', err);
        throw err;
    }
};

const getOneProfile = async (profile_id) => {
    try {
      console.log("Executing one profile")
        const profile = await db.one("SELECT * FROM profiles WHERE profile_id=$1", profile_id);
        console.log("query results:", profile)
        return profile;
    } catch(err) {
        throw err;
    }
};

const createProfile = async (profile) => {
    try {
        const { user_id, name, gender, profile_picture_url, bio, location } = profile;
        const createdProfile = await db.one("INSERT INTO profiles (user_id, name, gender, profile_picture_url, bio, location) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [user_id, name, gender, profile_picture_url, bio, location]);
        return createdProfile;
    } catch(err) {
        throw err;
    }
};

const deleteProfile = async (profile_id) => {
    try {
        const deletedProfile = await db.one("DELETE FROM profiles WHERE profile_id=$1 RETURNING *", profile_id);
        return deletedProfile;
    } catch(err) {
        throw err;
    }
};

const updateProfile = async (profile_id, profile) => {
    try {
        const { user_id, name, gender, profile_picture_url, bio, location } = profile;
        const updatedProfile = await db.one("UPDATE profiles SET user_id=$1, name=$2, gender=$3, profile_picture_url=$4, bio=$5, location=$6 WHERE profile_id=$7 RETURNING *", [user_id, name, gender, profile_picture_url, bio, location, profile_id]);
        return updatedProfile;
    } catch(err) {
        throw err;
    }
};

module.exports = {
    getAllProfiles,
    getOneProfile,
    createProfile,
    deleteProfile,
    updateProfile
};
