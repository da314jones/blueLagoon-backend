const db = require('../db/dbConfig');

const getAllProfessionalVthreads = async () => {
    try {
        return db.any("SELECT * FROM professional_vthreads");
    } catch (err) {
        console.error("Error fetching all Professional Vthreads", err);
        throw err
    }
};

const getProfessionalVthreadById = async (id) => {
    try {
    return db.one("SELECT * FROM professional_vthreads WHERE vthread_id = $1", id);
    } catch (err) {
        console.error(`Error fetching Professional VChat with ID ${id}:`, err);
        throw err;
    }
};

const createProfessionalVthread = async (vthread) => {
    const { topic, creator, industry, credentials, date, time, discussion_url, is_active, archived, archive_link } = vthread
    try {
    return db.one(
        "INSERT INTO professional_vthreads (topic, creator, industry, credentials, date, time, discussion_url, is_active, archived, archive_link) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
        [vthread.topic, vthread.creator, vthread.industry, vthread.credentials, vthread.date, vthread.time, vthread.discussion_url, vthread.is_active, vthread.archived, vthread.archive_link]
    );
    } catch (err) {
        console.error(`Error fetching Professional VChat with ID ${id}:`, err);
        throw err;
    }
};

const updateProfessionalVthread = async (id, vthread) => {
    try {
    return db.one(
        "UPDATE professional_vthreads SET topic = $1, creator = $2, industry = $3, credentials = $4, date = $5, time = $6, discussion_url = $7, is_active = $8, archived = $9, archive_link = $10 WHERE vthread_id = $11 RETURNING *",
        [vthread.topic, vthread.creator, vthread.industry, vthread.credentials, vthread.date, vthread.time, vthread.discussion_url, vthread.is_active, vthread.archived, vthread.archive_link, id]
    );
} catch (err) {
    console.error(`Error deleting Professional VChat with ID ${id}:`, err);
    throw err;
}
};

const deleteProfessionalVthread = async (id) => {
    return db.one("DELETE FROM professional_vthreads WHERE vthread_id = $1 RETURNING *", id);
};

module.exports = {
    getAllProfessionalVthreads,
    getProfessionalVthreadById,
    createProfessionalVthread,
    updateProfessionalVthread,
    deleteProfessionalVthread
};
