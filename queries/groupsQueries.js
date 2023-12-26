const db = require('../db/dbConfig');

const getAllGroups = async () => {
    return db.any("SELECT * FROM groups");
};

const getGroupById = async (id) => {
    return db.oneOrNone("SELECT * FROM groups WHERE id = $1", id);
};

const createGroup = async (group) => {
    return db.one(
        "INSERT INTO groups (group_name, description, creation_date) VALUES ($1, $2, $3) RETURNING *",
        [group.group_name, group.description, group.creation_date]
    );
};

const updateGroup = async (id, group) => {
    return db.oneOrNone(
        "UPDATE groups SET group_name = $1, description = $2, creation_date = $3 WHERE id = $4 RETURNING *",
        [group.group_name, group.description, group.creation_date, id]
    );
};

const deleteGroup = async (id) => {
    return db.oneOrNone("DELETE FROM groups WHERE id = $1 RETURNING *", id);
};

module.exports = {
    getAllGroups,
    getGroupById,
    createGroup,
    updateGroup,
    deleteGroup
};
