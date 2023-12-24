const db = require('../db/dbConfig.js');

const getAllResources = async () => {
    try {
        console.log("Executing query fetching all");
        const allResources = await db.any("SELECT * FROM");
        console.log("Query results:", allResources);
        return allResources
    } catch(err) {
        console.error("Failed fetch all Professional VChat")
        return err
    }
};

const getOneResource = async (id) => {
    try {
        const oneResource = await db.one("SELECT * FROM resource WHERE id=$1 RETURNING *", id)
        return oneResource
    } catch(err) {
        return err
    }
};

const createResource = async (resource) => {
    try {
        const createdResource = await db.one("INSERT INTO resources (title, type, link, location_based,location) VALUES ($1, $2, $3, $4, $5) RETURNING *", [resource.title, resource.type, resource.link, resource.location_based, resource.location]);
        return createdResource
    } catch(err) {
        return err
    }
};

const deleteResource = async (id) => {
    try {
        const deletedResource = await db.one("DELETE FROM resources WHERE id=$1 RETURNING *", id);
        return deletedResource;
    } catch(err) {
        return err
    }
};

const updateResource = async(id, resource) => {
    try {
        const { title, type, link, location_based, location } = resource;
        const updatedResource = await db.one("UPDATE resource SET title=$1, type=$2, link=$3, locationBase=$4, location=$5 WHERE id=$6 RETURNING *" [title, type, link, location_based, location, id])
    } catch(err) {
        return err
    }
};


module.exports = {
    getAllResources,
    getOneResource,
    createResource,
    deleteResource,
    updateResource
}