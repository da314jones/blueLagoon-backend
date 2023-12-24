const db = require('../db/dbConfig.js');

const getAllProfessionalVchats = async () => {
    try {
        console.log("Executing query fetching all");
        const allProfessionalVchats = await db.any("SELECT * FROM professional_vchats");
        console.log("Query results:", allProfessionalVchats);
        return allProfessionalVchats
    } catch(err) {
        console.error("Failed fetch all Professional VChat")
        return err
    }
};

const getOneProfessionalVchat = async (id) => {
    try {
        const oneProfessionalVchat = await db.one("SELECT * FROM professional_vchats WHERE id=$1", id);
        return oneProfessionalVchat
    } catch(err) {
        return err
    }
};

const createProfessionalVchat = async (professionalVchat) => {
    try {
        const createdProfessionalVchat = await db.one("INSERT INTO professional_vchats (topic, creator, video_url, date, time, is_live, archived, archived_link) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *", [professionalVchat.topic, professionalVchat.creator, professionalVchat.video_url, professionalVchat.date, professionalVchat.time, professionalVchat.is_live, professionalVchat.archived, professionalVchat.archived_link]);
        createdProfessionalVchat
    } catch(err) {
        return err
    }
};

const deleteProfessionalVchat = async (id) => {
    try {
        const deletedProfessionalVchat = await db.one("DELETE FROM professional_vchats WHERE id=$1 RETURNING *", id);
        return deletedProfessionalVchat;
    } catch(err) {
        return err
    }
};

const updateProfessionalVchat = async (id, professionalVchat) => {
     try {
         const { topic, creator, video_url, date, time, is_live, archived, archived_link } = professionalVchat;
         const updatedProfessionalVchat = await db.one("UPDATE professional_vchats SET topic=$1, creator=$2, video_url=$3, date=$4, time=$5, is_live=$6, archived=$7, archived_link=$8 WHERE id=$9 RETURNING *", [topic, creator, video_url, date, time, is_live, archived, archived_link, id]);
         return updatedProfessionalVchat;
     } catch(err) {
        return err
     }
};


module.exports = {
    getAllProfessionalVchats,
    getOneProfessionalVchat,
    createProfessionalVchat,
    deleteProfessionalVchat,
    updateProfessionalVchat
}