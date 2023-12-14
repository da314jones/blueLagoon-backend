const pool = require('../dbPool');

const getAllProfiles = async () => {
    try {
    console.log("Executing query to fetch all profiles")
        const allProfiles = await db.any("SELECT * FROM profiles");
        console.log("Query results:", allProfiles)
        return allProfiles;
    } catch(err) {
        res.status(404).json({ error: " Failed to fetch all profiles"})
    }
};

const getProfileById = async (id) => {
    try {

        const oneProfile = await db.one("SELECT * FROM profiles WHERE profiles=$1", id);
        return oneProfile;
    } catch(err) {
        res.status(404).json({ error: " Failed to fetch all profiles"})
    }
};

const createProfile = async (profile) => {
    try {
        const createdProfile = await db.one("INSERT INTO profiles (user_id, name, gender, profile_picture_url, bio, location) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [profile.user_id, profile.name, profile.gender, profile.profile_picture_url, profile.bio, profile.location]);
        return createdProfile;
    } catch(err) {
        res.status(404).json({ error: " Failed to fetch all profiles"})
    }
};

const deleteProfile = async (id) => {
    const deletedProfile = await db.one("DELETE FROM profiles WHERE profile_id=$1 RETURNING *", id);
    return deletedProfile;
};

const updateProfile = async (id, profile) => {
    const { user_id, name, gender, profile_picture_url, bio, location } = profile;
    const updatedReview = await db.one("UPDATE profiles SET user_id=$1, name=$2, gender=$3, profile_picture_url=$4, bio=$5, location=$6, profile_id=$7, WHERE id=$8, RETURNING *", [user_id, name, gender, profile_picture_url, bio, location, id]);
    return updatedReview;
};

module.exports = {
    getAllProfiles,
    getProfileById,
    createProfile,
    deleteProfile,
    updateProfile
};
