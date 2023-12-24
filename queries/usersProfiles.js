const db = require("../db/dbConfig");

const getAllProfiles = async () => {
  try {
    console.log("Executing query to fetch all profiles");
    const allProfiles = await db.any("SELECT * FROM profiles");
    console.log("Query results:", allProfiles);
    return allProfiles;
  } catch (err) {
    throw new Error("Failed to fetch all profiles");
  }
};

const getOneProfile = async (id) => {
  try {
    const oneProfile = await db.one("SELECT * FROM profiles WHERE profile_id=$1", id);
    return oneProfile;
  } catch (err) {
    throw new Error("Failed to fetch the profile");
  }
};

const createProfile = async (profile) => {
  try {
    const createdProfile = await db.one(
      "INSERT INTO profiles (user_id, name, gender, profile_picture_url, bio, location) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [profile.user_id, profile.name, profile.gender, profile.profile_picture_url, profile.bio, profile.location]
    );
    return createdProfile;
  } catch (err) {
    throw new Error("Failed to create profile");
  }
};

const deleteProfile = async (id) => {
  try {
    const deletedProfile = await db.one("DELETE FROM profiles WHERE profile_id=$1 RETURNING *", id);
    return deletedProfile;
  } catch (err) {
    throw new Error("Failed to delete profile");
  }
};

const updateProfile = async (id, profile) => {
  try {
    const { user_id, name, gender, profile_picture_url, bio, location } = profile;
    const updatedProfile = await db.one(
      "UPDATE profiles SET user_id=$1, name=$2, gender=$3, profile_picture_url=$4, bio=$5, location=$6 WHERE profile_id=$7 RETURNING *",
      [user_id, name, gender, profile_picture_url, bio, location, id]
    );
    return updatedProfile;
  } catch (err) {
    throw new Error("Failed to update profile");
  }
};

module.exports = {
  getAllProfiles,
  getOneProfile,
  createProfile,
  deleteProfile,
  updateProfile,
};
