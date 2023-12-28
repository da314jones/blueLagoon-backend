const db = require('../db/dbConfig');
const { createSessionAsync } = require('../service/openTokService');

const getAllVChats = async () => {
    try {

        console.log("Executing query fetching all vchats!")
        const allVChats = await db.any("SELECT * FROM vchats");
        console.log("Query results:", allVChats);
        return allVChats
    } catch (err) {
        console.error("Error fetching all VChats")
        return err
    }
};

const getVChatById = async (id) => {
    try {
        console.log(`Executing query fetching one VChat by id:, ${id}`)
        const oneVChat = await db.one("SELECT * FROM vchats WHERE session_id = $1", id);
        console.log("Fetched one VChat:", oneVChat);
        return oneVChat
    } catch (err) {
        console.error(`Error fetching VChat with ID ${id}:`, err);
        throw new Error(`Failed to fetch VChat with ID ${id}`);
        }
};

const createVChat = async (vchat) => {
    try {
        console.log("Executing query create VChat")
        const sessionId = await createSessionAsync();
        console.log("OpenTok sessionId:", sessionId)
        const createdVChat = await db.one(
            "INSERT INTO vchats (host_user_id, video_url, schedule_time, duration, archive_link, start_time, end_time, archive_url, opentok_session_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
            [vchat.host_user_id, vchat.video_url, vchat.schedule_time, vchat.duration, vchat.archive_link, vchat.start_time, vchat.end_time, vchat.archive_url, sessionId]
        );
        console.log("Created VChat:", createdVChat);
        return createdVChat;
    } catch(err) {
    console.error('Error creating VChat:', err)
    throw new Error('Failed to create VChat')
}
};

const updateVChat = async (id, vchat) => {
    try {
        console.log("Executing query updating VChat")
        const updatedVChat = await db.one(
        "UPDATE vchats SET host_user_id=$1, video_url=$2, schedule_time=$3, duration=$4, archive_link=$5, start_time=$6, end_time=$7, archive_url=$8 WHERE id=$9 RETURNING *",
        [vchat.host_user_id, vchat.video_url, vchat.schedule_time, vchat.duration, vchat.archive_link, vchat.start_time, vchat.end_time, vchat.archive_url, id]
    );
    console.log("Query results:", updatedVChat);
    return updatedVChat
} catch(err) {
    console.error('Error updating VChat')
    return err
}
};

const deleteVChat = async (id) => {
    try {
        console.log(`Deleting VChat with ID: ${id}`);
        const deletedVChat = await db.one("DELETE FROM vchats WHERE session_id = $1 RETURNING *", id);
        console.log(`Deleted VChat:`, deletedVChat);
        return deletedVChat;
    } catch (err) {
        console.error(`Error deleting VChat with ID ${id}:`, err);
        throw new Error(`Failed to delete VChat with ID ${id}`);
    }
};


module.exports = {
    getAllVChats,
    getVChatById,
    createVChat,
    updateVChat,
    deleteVChat
};
