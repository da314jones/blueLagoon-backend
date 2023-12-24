const db = require("../db/dbConfig");

const getAllSecurity = async () => {
  try {
    console.log("Executing query fetching all security by id");
    const allSecurity = await db.any("SELECT * FROM security");
    console.log("Query results:", allSecurity);
    return allSecurity;
  } catch (err) {
    console.error("Failed fetch all security VChat");
    return err;
  }
};

const getSecurityById = async (id) => {
  try {
    const oneSecurityId = await db.one(
      "SELECT * FROM security WHERE id=$1",
      id
    );
    return oneSecurityId;
  } catch (err) {
    return err;
  }
};

const createSecurity = async (security) => {
  try {
    const createdSecurity = await db.one(
      "INSERT INTO security (user_id, email_verified, phone_verified, phone_verification_code, two_factor_enabled, last_login) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [
        security.user_id,
        security.email_verified,
        security.phone_verified,
        security.phone_verification_code,
        security.two_factor_enabled,
        security.last_login,
      ]
    );
    return createdUserSecurity;
  } catch (err) {
    return err;
  }
};

const deleteSecurity = async (id) => {
  try {
    const deletedSecurity = await db.one(
      "DELETE FROM security WHERE security_id=$1 RETURNING *",
      id
    );
    return deletedSecurity;
  } catch (err) {
    return err;
  }
};

const updateSecurity = async (id, security) => {
  try {
    const {
      user_id,
      email_verified,
      phone_verified,
      phone_verification_code,
      two_factor_enabled,
      last_login,
    } = security;
    const updatedSecurity = await db.one(
      "UPDATE security SET user_id=$1, email_verified=$2, phone_verified=$3, phone_verification_code=$4, two_factor_enabled=$5, last_login=$6 WHERE id=$7 RETURNING *",
      [
        user_id,
        email_verified,
        phone_verified,
        phone_verification_code,
        two_factor_enabled,
        last_login,
        id,
      ]
    );
    return updatedSecurity;
  } catch (err) {
    return err;
  }
};

module.exports = {
  getAllSecurity,
  getSecurityById,
  createSecurity,
  deleteSecurity,
  updateSecurity,
};
