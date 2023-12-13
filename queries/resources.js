const db = require('../db/dbConfig.js');

const getAllResources = async () => {
    try {
        console.log("Executing query fetching all");
        const all = await db.any("SELECT * FROM");
        console.log("Query results:", all);
        return all
    } catch(err) {
        console.error("Failed fetch all Professional VChat")
        return err
    }
};

const getOneResources = async () => {
    try {

    } catch(err) {
        return err
    }
};

const createResources = async () => {
    try {

    } catch(err) {
        return err
    }
};

const deleteResources = async () => {
    try {

    } catch(err) {
        return err
    }
};

const updateResources = async => {
    try {

    } catch(err) {
        return err
    }
};


module.exports = {
    getAllResources,
    getOneResources,
    createResources,
    deleteResources,
    updateResources
}