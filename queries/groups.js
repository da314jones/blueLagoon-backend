const db = require("../db/dbConfig.js");

const getAllGroups = async () => {
    try {
        console.log("Executing query to fetch all groups");
        const allGroups = await db.any("SELECT * FROM groups");
        console.log("Query result:", allGroups);
        return allGroups
    }catch(err) {
        console.error("Failed To fetch allGroups")
        return err
    }
};

const getOneGroup = async (id) => {
    try {
        const oneGroup = await db.one("SELECT * FROM groups WHERE id=$1", id)
        return oneGroup
    }catch(err) {
        return err
    }
};

const createGroup = async (group) => {
    try {
        const createdGroup = await db.one("INSERT INTO group (group_name, description, creation_date) VALUES ($1, $2, $3) RETURNING *", [group.group_name, group.description, group.creation_date])
        return createdGroup
    }catch(err) {
        return err
    }
};

const deleteGroup = async (id) => {
    try {
        const deletedGroup = await db.one("DELETE FROM groups WHERE id=$1", id)
    }catch(err) {
        return err
    }
};

const updateGroup = async (id, group) => {
    try {
        const { group_name, description, creation_date } = group;
        const updatedGroup = await db.one("UPDATE groups SET group_name=$1, description=$2, creation_date=$3 WHERE id=$4", id)
        return updatedGroup
    }catch(err) {
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