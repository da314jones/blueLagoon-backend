const db = require('../db/dbConfig');

const getAllProfessionalVChats = async () => {
    try {
        return await db.any("SELECT * FROM professional_vchats");
    } catch (err) {
        console.error("Error fetching all Professional VChats:", err);
        throw err;
    }
};

const getProfessionalVChatById = async (id) => {
    try {
        return await db.one("SELECT * FROM professional_vchats WHERE vchat_id = $1", id);
    } catch (err) {
        console.error(`Error fetching Professional VChat with ID ${id}:`, err);
        throw err;
    }
};

const createProfessionalVChat = async (vchat) => {
    const { topic, creator, industry, credentials, date, time, video_url, is_live, archived, archive_link } = vchat;
    try {
        return await db.one(
            "INSERT INTO professional_vchats (topic, creator, industry, credentials, date, time, video_url, is_live, archived, archive_link) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
            [topic, creator, industry, credentials, date, time, video_url, is_live, archived, archive_link]
        );
    } catch (err) {
        console.error('Error creating Professional VChat:', err);
        throw err;
    }
};

const deleteProfessionalVChat = async (id) => {
    try {
        return await db.one("DELETE FROM professional_vchats WHERE vchat_id = $1 RETURNING *", id);
    } catch (err) {
        console.error(`Error deleting Professional VChat with ID ${id}:`, err);
        throw err;
    }
};

const updateProfessionalVChat = async (id, vchat) => {
    const { topic, creator, industry, credentials, date, time, video_url, is_live, archived, archive_link } = vchat;
    try {
        return await db.one(
            "UPDATE professional_vchats SET topic = $1, creator = $2, industry = $3, credentials = $4, date = $5, time = $6, video_url = $7, is_live = $8, archived = $9, archive_link = $10 WHERE vchat_id = $11 RETURNING *",
            [topic, creator, industry, credentials, date, time, video_url, is_live, archived, archive_link, id]
        );
    } catch (err) {
        console.error(`Error updating Professional VChat with ID ${id}:`, err);
        throw err;
    }
};

module.exports = {
    getAllProfessionalVChats,
    getProfessionalVChatById,
    createProfessionalVChat,
    deleteProfessionalVChat,
    updateProfessionalVChat
};
