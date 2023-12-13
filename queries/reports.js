const db = require('../db/dbConfig.js');

const getAllReports = async () => {
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

const getOneReport = async () => {
    try {

    } catch(err) {
        return err
    }
};

const createReport = async () => {
    try {

    } catch(err) {
        return err
    }
};

const deleteReport = async () => {
    try {

    }  catch(err) {
        return err
    }
};

const updateReport = async () => {
    try {

    } catch(err) {
        return err
    }
};


module.children.exports = {
    getAllReports,
    getOneReport,
    createReport,
    deleteReport,
    updateReport
}