const db = require('../db/dbConfig.js');

const getAllProfessionalVchat = async () => {
    try {
        console.log("Executing query fetching all Professional VChat");
        const allProfessionalVchats = await db.any("SELECT * FROM");
        console.log("Query results:", allProfessionalVchats);
        return allProfessionalVchats
    } catch(err) {
        console.error("Failed fetch all Professional VChat")
        return err
    }
};

const getOneProfessionalVchat = async (id) => {
    try {
        const oneProfessionalVchat = await db.one("SELECT FROM professional_vchats WHERE id=$1 RETURNING *", id);
        return oneProfessionalVchat
    } catch(err) {
        return err
    }
};

const createProfessionalVchat = async (professionalVchat) => {
    try {
        const createdProfessionalVchat = await db.one(" INSERT INTO professional_vchat (topic, creator, video_url, date, time, is_live, archived, archive_link) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *", [topic, creator, video_url, date, time, is-live, archived, archived_link]);
        return createdProfessionalVchat
    } catch(err) {
        return err
    }
};

const deleteProfessionalVchat = async () => {
    try {

    } catch(err) {
        return err
    }
};

const updateProfessionalVchat = async () => {
    try {

    } catch(err) {
        return err
    }
};


module.exports = {
    getAllProfessionalVchat,
    getOneProfessionalVchat,
    createProfessionalVchat,
    deleteProfessionalVchat,
    updateProfessionalVchat
}