const express = require('express');
const professionalVchats = express.Router();
const {
    getAllProfessionalVChats,
    getProfessionalVChatById,
    createProfessionalVChat,
    deleteProfessionalVChat,
    updateProfessionalVChat
} = require('../queries/professionalVchatsQueries');
const { professionalVChatsValidationSchema } = require('../validations/checkProfessionalVchats.js');

// GET all Professional VChats
professionalVchats.get('/', async (req, res) => {
    try {
        const vChats = await getAllProfessionalVChats();
        res.json(vChats);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET one Professional VChat by ID
professionalVchats.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const vChat = await getProfessionalVChatById(id);
        if (vChat) {
            res.json(vChat);
        } else {
            res.status(404).json({ error: 'Professional VChat not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST a new Professional VChat
professionalVchats.post('/', async (req, res) => {
    try {
        const validation = professionalVChatsValidationSchema.validate(req.body);
        if (validation.error) {
            return res.status(400).json({ error: validation.error.details[0].message });
        }
        const vChat = await createProfessionalVChat(req.body);
        res.status(201).json(vChat);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE a Professional VChat
professionalVchats.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedVChat = await deleteProfessionalVChat(id);
        if (deletedVChat) {
            res.json(deletedVChat);
        } else {
            res.status(404).json({ error: 'Professional VChat not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT (update) a Professional VChat
professionalVchats.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const validation = professionalVChatsValidationSchema.validate(req.body);
        if (validation.error) {
            return res.status(400).json({ error: validation.error.details[0].message });
        }
        const updatedVChat = await updateProfessionalVChat(id, req.body);
        if (updatedVChat) {
            res.json(updatedVChat);
        } else {
            res.status(404).json({ error: 'Professional VChat not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = professionalVchats;
