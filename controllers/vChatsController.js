const express = require('express');
const vchats = express.Router();
const { createSessionAsync, generateToken } = require('../service/openTokService')
const vchatsValidationSchema = require('../validations/checkProfessionalVthreads');
const {
    getAllVChats,
    getVChatById,
    getVChatParticipants,
    updateVChatParticipantsLeaveTime,
    updateStatusOFVChat,
    createVChat,
    updateVChat,
    deleteVChat
} = require('../queries/vchatsQueries');

// Get all VChats
vchats.get('/', async (req, res) => {
    console.log("Request to fetch all vchats received");
    try {
        const allVChats = await getAllVChats();
        console.log("All vchats fetched:", allVChats);
        res.status(200).json(allVChats);
    } catch (err) {
        console.error("Error in fetching all vchats:", err);
        res.status(500).json({ error: err.message });
    }
});


// Get VChat by ID
vchats.get('/:id', async (req, res) => {
    const id = req.params.id;
    console.log(`Request to fetch vchat with id ${id} received`);
    try {
        const vchat = await getVChatById(id);
        console.log(`VChat with id ${id} fetched:`, vchat);
        res.status(200).json(vchat);
    } catch (err) {
        console.error(`Error in fetching vchat with id ${id}:`, err);
        res.status(500).json({ error: err.message });
    }
});

// Get Participant of specific VChat session
vchats.get('/:id/participants', async (req, res) => {
    const videoSessionId = req.params.id;
    console.log(`Request to fetch participants for video session id ${videoSessionId} received`);
    try {
        const participants = await getVChatParticipants(videoSessionId);
        console.log(`Participants for video session id ${videoSessionId} fetched:`, participants);
        res.status(200).json(participants);
    } catch (err) {
        console.error(`Error in fetching participants for video session id ${videoSessionId}:`, err);
        res.status(500).json({ error: err.message });
    }
});

// Update leave time of participant
vchats.put('/:id/participants/:participantId/leave', async (req, res) => {
    const videoSessionId = req.params.id;
    const participantId = req.params.participantId;
    console.log(`Request to update leave time for participant ${participantId} in session ${videoSessionId} received`);
    try {
        await updateVChatParticipantsLeaveTime(videoSessionId, participantId);
        console.log(`Leave time for participant ${participantId} in session ${videoSessionId} updated`);
        res.status(200).json({ message: 'Leave time updated successfully' });
    } catch (err) {
        console.error(`Error updating leave time for participant ${participantId} in session ${videoSessionId}:`, err);
        res.status(500).json({ error: err.message });
    }
});

// Create VChat
vchats.post('/', async (req, res) => {
    console.log("Request to create a new vchat received");
    try {
        const newVChat = req.body;
        const createdVChat = await createVChat(newVChat);
        console.log("New VChat created:", createdVChat);
        res.status(201).json(createdVChat);
    } catch (err) {
        console.error("Error creating new VChat:", err);
        res.status(500).json({ error: err.message });
    }
});


// Update VChat
vchats.put('/:id', async (req, res) => {
    const id = req.params.id;
    console.log(`Request to update vchat with id ${id} received`);
    try {
        const vchatDetails = req.body;
        const updatedVChat = await updateVChat(id, vchatDetails);
        console.log(`VChat with id ${id} updated:`, updatedVChat);
        res.status(200).json(updatedVChat);
    } catch (err) {
        console.error(`Error updating vchat with id ${id}:`, err);
        res.status(500).json({ error: err.message });
    }
});


// Delete VChat
vchats.delete('/:id', async (req, res) => {
    const id = req.params.id;
    console.log(`Request to delete vchat with id ${id} received`);
    try {
        const deletedVChat = await deleteVChat(id);
        console.log(`VChat with id ${id} deleted:`, deletedVChat);
        res.status(200).json(deletedVChat);
    } catch (err) {
        console.error(`Error deleting vchat with id ${id}:`, err);
        res.status(500).json({ error: err.message });
    }
});


module.exports = vchats;
