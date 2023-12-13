const pool = require('../dbPool');

const getAllUserSecurity = async () => {
    try {
        console.log(
            "Executing query fetching all security by id"
        )
        const allUserSecurity = await db.one("SELECT * FROM user_security");
        console.log("Query results:", allUserSecurity)
             return allUserSecurity;
        } catch(err) {
            console.error("Failed fetch all Professional VChat")
            return err
    }
};

const getUserSecurityById = async (id) => {
    try {
        const oneUserSecurityId = await db.one("SELECT * FROM user_security WHERE security_id=$1", id);
        return oneUserSecurityId;
    }  catch(err) {
        return err
    }
    };

const createUserSecurity = async (userSecurity) => {
    try {
        const { user_id, email_verified, phone_verified, phone_verification_code, two_factor_enabled, last_login } = userSecurity;
        const createdUserSecurity = await db.one("INSERT INTO user_security (user_id, email_verified, phone_verified, phone_verification_code, two_factor_enabled, last_login) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [user_id, email_verified, phone_verified, phone_verification_code, two_factor_enabled, last_login]);
        return createdUserSecurity;
        }
        catch(err) {
        return err
        }
}

const deleteUserSecurity = async (id) => {
    try {
        const deletedUserSecurity = await db.one("DELETE FROM user_security WHERE security_id=$1 RETURNING *", id);
        return deletedUserSecurity;
    } catch(err) {
            return err
    }

};

const updateUserSecurity = async (id, userSecurity) => {
    try {
        const { user_id, email_verified, phone_verified, phone_verification_code, two_factor_enabled, last_login } = userSecurity;
        const updatedUserSecurity = await db.one("UPDATE user_security SET user_id=$1, email_verified=$2, phone_verified=$3, phone_verification_code=$4, two_factor_enabled=$5, last_login=$6 WHERE id=$7 RETURNING *", [user_id, email_verified, phone_verified, phone_verification_code, two_factor_enabled, last_login, id]);
        return updatedUserSecurity;
    } catch(err) {
        return err
    }
};

module.exports = {
    getAllUserSecurity,
    getUserSecurityById,
    createUserSecurity,
    deleteUserSecurity,
    updateUserSecurity
};
