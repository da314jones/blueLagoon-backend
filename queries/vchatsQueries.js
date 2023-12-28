const db = require('../db/dbConfig');
const { createSessionAsync } = require('../service/openTokService.js');

// vchats and participants tables.

// Fetching All Video Chat Sessions (getAllVChats):


const getAllVChats = async () => {
    try {
        console.log("Executing query fetching all vchats!");
        const allVChats = await db.any("SELECT * FROM vchats");
        console.log("Query results:", allVChats);
        return allVChats;
    } catch (err) {
        console.error("Error fetching all VChats:", err);
        throw new Error("Failed to fetch all VChats");
    }
};

// Fetching a Single Video Chat Session by ID (getVChatById):
const getVChatById = async (id) => {
    try {
        console.log(`Executing query fetching one VChat by id: ${id}`);
        const oneVChat = await db.one("SELECT * FROM vchats WHERE id=$1", id);
        console.log("Fetched one VChat:", oneVChat);
        return oneVChat;
    } catch (err) {
        console.error(`Error fetching VChat with ID ${id}:`, err);
        throw new Error(`Failed to fetch VChat with ID ${id}`);
    }
};

// Fetching Participants for a Video Chat Session (getVChatParticipants):
const getVChatParticipants = async (videoSessionId) => {
    try {
        console.log(`Executing query to fetch participants for VChat session ID: ${videoSessionId}`);
        const participants = await db.any(
            "SELECT * FROM participants WHERE video_session_id=$1",
            videoSessionId
        );
        console.log("Query results:", participants);
        return participants;
    } catch (err) {
        console.error(`Error fetching participants for VChat session ID ${videoSessionId}:`, err);
        throw new Error(`Failed to fetch participants for VChat session ID ${videoSessionId}`);
    }
};

// Updating the Leave Time for a Participant (updateVChatParticipantsLeaveTime):
const updateVChatParticipantsLeaveTime = async (videoSessionId, participantId) => {
    try {
        console.log(`Updating leave time for participant ${participantId} in VChat session ID: ${videoSessionId}`);
        await db.none(
            "UPDATE participants SET leave_time = NOW() WHERE video_session_id=$1 AND participant_id=$2",
            [videoSessionId, participantId]
        );
        console.log(`Leave time updated for participant ${participantId}`);
    } catch (err) {
        console.error(`Error updating leave time for participant ${participantId}:`, err);
        throw new Error(`Failed to update leave time for participant ${participantId}`);
    }
};

// Updating the Status of a Video Chat Session (updateStatusOFVChat):
const updateStatusOFVChat = async (id, newStatus) => {
    try {
        console.log(`Updating status of VChat with ID: ${id}`);
        const updatedVChat = await db.one(
            "UPDATE vchats SET status=$1 WHERE id=$2 RETURNING *",
            [newStatus, id]
        );
        console.log(`Status updated for VChat:`, updatedVChat);
        return updatedVChat;
    } catch (err) {
        console.error(`Error updating status of VChat with ID ${id}:`, err);
        throw new Error(`Failed to update status of VChat with ID ${id}`);
    }
};

// Creating a New Video Chat Session (createVChat):
const createVChat = async (vchat) => {
    try {
        console.log("Executing query to create VChat");
        const sessionId = await createSessionAsync();
        console.log("OpenTok sessionId:", sessionId);
        const createdVChat = await db.one(
            "INSERT INTO vchats (session_id, session_name, created_at, updated_at, status, duration, session_type, host_id, recording_status) VALUES ($1, $2, NOW(), NOW(), $3, $4, $5, $6, $7) RETURNING *",
            [sessionId, vchat.session_name, vchat.status, vchat.duration, vchat.session_type, vchat.host_id, vchat.recording_status]
        );
        console.log("Created VChat:", createdVChat);
        return createdVChat;
    } catch (err) {
        console.error('Error creating VChat:', err);
        throw new Error('Failed to create VChat');
    }
};

// Updating a Video Chat Session (updateVChat):
const updateVChat = async (id, vchat) => {
    try {
        console.log("Executing query to update VChat");
        const updatedVChat = await db.one(
            "UPDATE vchats SET session_name=$1, status=$2, duration=$3, session_type=$4, host_id=$5, recording_status=$6 WHERE id=$7 RETURNING *",
            [vchat.session_name, vchat.status, vchat.duration, vchat.session_type, vchat.host_id, vchat.recording_status, id]
        );
        console.log("Updated VChat:", updatedVChat);
        return updatedVChat;
    } catch (err) {
        console.error('Error updating VChat:', err);
        throw new Error(`Failed to update VChat with ID ${id}`);
    }
};

// Deleting a Video Chat Session (deleteVChat):
const deleteVChat = async (id) => {
    try {
        console.log(`Deleting VChat with ID: ${id}`);
        const deletedVChat = await db.one("DELETE FROM vchats WHERE id=$1 RETURNING *", id);
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
    getVChatParticipants,
    updateVChatParticipantsLeaveTime,
    updateStatusOFVChat,
    createVChat,
    updateVChat,
    deleteVChat
};
