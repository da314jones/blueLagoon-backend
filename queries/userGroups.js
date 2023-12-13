const db = require('../db/dbConfig.js');

const getAllGroups = async () => {
    try {
        console.log("executing query to fetch all userGroups");
        const allUserGroups = await db.any("SELECT *FROM userGroups")
        console.log("Query results:", allUserGroups);
        return allUserGroups;
    } catch(err) {
        console.error("Error failed to fetch allUserGroups")
        return err
    }
};

const getOneGroup = async (id) => {
    try {
        const oneUserGroup = await db.one("SELECT * FROM userGroups WHERE id=$1", id)
        return oneUserGroup
    } catch(err) {
        return err
    }
};

const createGroup = async (userGroup) => {
    try {
        const createdUserGroup = await db.one("INSERT INTO userGroups (user_id, group-id, join_date) RETURNING*", [userGroup.user_id, userGroup.group_id, userGroup.join_date])
        return createdUserGroup
    } catch(err) {
        return err
    }
};

const deleteGroup = async (id) => {
    try {
        const deletedUserGroup = await db.one("DELETE FROM userGroups WHERE id=$1 RETURNING *", id);
        return deletedUserGroup
    } catch(err) {
        return err
    }
};

const updateGroup = async (id, userGroup) => {
    try {
        const { user_id, group_id, join_date } = userGroup;
        const updatedUserGroup = await db.one("UPDATE userGroups SET (user_id=$1, group_id=$2, join_date=$3) RETURNING *", id);
        return updatedUserGroup
    } catch(err) {
        return err
    }
};


module.exports = {
    getAllGroups,
    getOneGroup,
    createGroup,
    deleteGroup,
    updateGroup
}