const express = require('express');
const vchats = express.Router();
const { createSessionAsync, generateToken } = require('../service/openTokService')
const vchatsValidationSchema = require('../validations/checkProfessionalVthreads');
const {
    getAllVChats,
    getVChatById,
    createVChat,
    updateVChat,
    deleteVChat
} = require('../queries/vchatsQueries');

// Get all VChats
vchats.get('/', async (req, res) => {
    try {
        const vchats = await getAllVChats();
        res.json(vchats);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get VChat by ID
vchats.get('/:id', async (req, res) => {
    try {
        const vchat = await getVChatById(req.params.id);
        res.json(vchat);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create VChat
vchats.post('/', async (req, res) => {
    const { error } = vchatsValidationSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
        const sessionId = await createSessionAsync();
        const token = generateToken(sessionId);
        const newVChat = await createVChat({ ...req.body, opentok_session_id: sessionId });
        res.status(201).json({ ...newVChat, token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update VChat
vchats.put('/:id', async (req, res) => {
    const { error } = vchatsValidationSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
        const updatedVChat = await updateVChat(req.params.id, req.body);
        res.json(updatedVChat);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete VChat
vchats.delete('/:id', async (req, res) => {
    try {
        const deletedVChat = await deleteVChat(req.params.id);
        res.json(deletedVChat);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = vchats;
