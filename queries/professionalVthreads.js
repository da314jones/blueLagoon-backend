const db = require('../db/dbConfig.js');

const getAllProfessionalVthreads = async () => {
    try {
        console.log("Executing query fetching all Professional Vthreads");
        const allProfessionalVthreads = await db.any("SELECT * FROM professional_vthreads");
        console.log("Query results:", allProfessionalVthreads);
        return allProfessionalVthreads
    } catch(err) {
        console.error("Failed fetch all Professional Vthreads")
        return err
    }
};

const getOneProfessionalVthread = async (id) => {
    try {
        const oneProfessionalVthreads = await db.one("SELECT FROM professional_vthreads WHERE id=$1", id);
        return oneProfessionalVthreads
    } catch(err) {
        return err
    }
};

const createProfessionalVthread = async (professionalVthread) => {
    try {
        const createdProfessionalVthread = await db.one(" INSERT INTO professional_Vthreads (topic, creator, video_url, date, time, is_live, archived, archive_link) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *", [professionalVthread.topic, professionalVthread.creator, professionalVthread.video_url, professionalVthread.date, professionalVthread.time, professionalVthread.is_live, professionalVthread.archived, professionalVthread.archived_link]);
        return createdProfessionalVthread
    } catch(err) {
        return err
    }
};

const deleteProfessionalVthread = async (id) => {
    try {
        const deletedProfessionalVthread = await db.one("DELETE FROM professional_vthreads WHERE id=$1 RETURNING *", id);
        return deletedProfessionalVthread;
    } catch(err) {
        return err
    }
};

const updateProfessionalVthread = async (id, professionalVthread) => {
    try {
        const { topic, creator, video_url, date, time, is_live, archived, archive_link } = professionalVthread;
        const updatedProfessionalVthread = await db.one("UPDATE professional_vthreads SET topic=$1, creator=$2, video_url=$3, date=$4, time=$5, is_live=$6, archived=$7, archive_link=$8 WHERE id=$9 RETURNING *", [topic, creator, video_url, date, time, is_live, archived, archive_link, id]);
        return updatedProfessionalVthread
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