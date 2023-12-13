const db = require('../db/dbConfig.js');

const getAllProfessionalVthreads = async () => {
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

const getOneProfessionalVthread = async () => {
    try {

    } catch(err) {
        return err
    }
};

const createProfessionalVthread = async () => {
    try {

    } catch(err) {
        return err
    }
};

const deleteProfessionalVthread = async () => {
    try {

    } catch(err) {
        return err
    }
};

const updateProfessionalVthread = async () => {
     try {
         
     } catch(err) {
        return err
     }
};


module.exports = {
    getAllProfessionalVthreads,
    getOneProfessionalVthread,
    createProfessionalVthread,
    deleteProfessionalVthread,
    updateProfessionalVthread
}