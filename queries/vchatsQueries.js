const db = require('../db/dbConfig.js');

// const getAllVChats = async () => {
//     try {
//         console.log("Executing query to fetch all VChats");
//         const allVChats = await db.any("SELECT * FROM vchats");
//         console.log("Query result:", allVChats);
//         return allVChats
//     } catch(err) {
//         console.error('Error fetching all VChats')
//         return err
//     }
// };

const getOneVChat = async (id) => {
    try {
        const oneVChat = await db.one("SELECT * FROM vchats WHERE id=$1", id)
        return oneVChat
    } catch(err) {
        console.error('Error fetching one VChats')
        return err
    }
};

const createVChat = async (vchat) => {
    try {
        const createdVChat = await db.one("INSERT INTO vchats (opentok_session_id, created_at, updated_at, status, duration, session_type, host_id, recording_status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *", [vchat.opentok_session_id, vchat.created_at, vchat.updated_at, vchat.status, vchat.duration, vchat.session_type, vchat.host_id, vchat.recording_status])
        return createdVChat
    }catch(err) {
        console.error('Error fetching creating VChats')
        return err
    }
};

const deleteVChat = async (id) => {
    try {
        const deletedVChat = await db.one("DELETE FROM vchats WHERE id=$1 RETURNING *", id)
        return deletedVChat
    }catch(err) {
        console.error('Error deleting all VChats')
        return err
    }
};

const updateVChat = async (id, vchat) => {
    try {
        const { opentok_session_id, created_at, updated_at, status, duration, session_type, host_id, recording_status } = vchat;
        const updatedVChat = await db.one(
            "UPDATE vchats SET opentok_session_id=$1, created_at=$2, updated_at=$3, status=$4, duration=$5, session_type=$6, host_id=$7, recording_status=$8 WHERE id=$9 RETURNING *",
            [opentok_session_id, created_at, updated_at, status, duration, session_type, host_id, recording_status, id]
        );
        return updatedVChat;
    } catch (err) {
        console.error('Error updating VChat:', err);
        return err;
    }
};

module.exports = {
    // getAllVChats,
    getOneVChat,
    createVChat,
    deleteVChat,
    updateVChat,
};

