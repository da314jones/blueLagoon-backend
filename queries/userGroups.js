const db = require('../db/dbConfig.js');

const getAllUserGroups = async () => {
    try {
        console.log("executing query to fetch all UserGroups");
        const allUserGroups = await db.any("SELECT *FROM user_groups")
        console.log("Query results:", allUserGroups);
        return allUserGroups;
    } catch(err) {
        console.error("Error failed to fetch allUserGroups")
        return err
    }
};

const getOneUserGroup = async (id) => {
    try {
        const oneUserGroup = await db.one("SELECT * FROM user_groups WHERE id=$1", id)
        return oneUserGroup
    } catch(err) {
        return err
    }
};

const createUserGroup = async (userGroup) => {
    try {
        const createdUserGroup = await db.one("INSERT INTO user_groups (user_id, userGroup-id, join_date) RETURNING*", [userGroup.user_id, userGroup.userGroup_id, userGroup.join_date])
        return createdUserGroup
    } catch(err) {
        return err
    }
};

const deleteUserGroup = async (id) => {
    try {
        const deletedUserGroup = await db.one("DELETE FROMuser_groups WHERE id=$1 RETURNING *", id);
        return deletedUserGroup
    } catch(err) {
        return err
    }
};

const updateUserGroup = async (id, userGroup) => {
    try {
        const { user_id, userGroup_id, join_date } = userGroup;
        const updatedUserGroup = await db.one("UPDATE user_groups SET user_id=$1, userGroup_id=$2, join_date=$3, WHERE id=$4, RETURNING *", [user_id, userGroup_id, join_date, id])
        return updatedUserGroup
    } catch(err) {
        return err
    }
};


module.exports = {
    getAllUserGroups,
    getOneUserGroup,
    createUserGroup,
    deleteUserGroup,
    updateUserGroup
}