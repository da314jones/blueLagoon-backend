const db = require('../db/dbConfig');

const getAllUserGroups = async () => {
    return db.any("SELECT * FROM user_groups");
};

const getUserGroupById = async (id) => {
    return db.oneOrNone("SELECT * FROM user_groups WHERE id = $1", id);
};

const createUserGroup = async (userGroup) => {
    return db.one(
        "INSERT INTO user_groups (user_id, group_id, join_date) VALUES ($1, $2, $3) RETURNING *",
        [userGroup.user_id, userGroup.group_id, userGroup.join_date]
    );
};

module.exports = {
    getAllUserGroups,
    getUserGroupById,
    createUserGroup
};
