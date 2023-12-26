const express = require('express');
const professionalVthreads = express.Router();

const {
    getAllProfessionalVthreads,
    getOneProfessionalVthread,
    createProfessionalVthread,
    deleteProfessionalVthread,
    updateProfessionalVthread
} = require('../queries/vthreadsQueries');

professionalVthreads.get('/', async (req, res) => {
    try {
        const vThreads = await getAllProfessionalVthreads();
        res.json(vThreads);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

professionalVthreads.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const vThread = await getOneProfessionalVthread(id);
        if (vThread) {
            res.json(vThread);
        } else {
            res.status(404).json({ error: 'VThread not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

professionalVthreads.post('/', async (req, res) => {
    try {
        const vThread = await createProfessionalVthread(req.body);
        res.status(201).json(vThread);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

professionalVthreads.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedVThread = await deleteProfessionalVthread(id);
        if (deletedVThread) {
            res.json(deletedVThread);
        } else {
            res.status(404).json({ error: 'VThread not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

professionalVthreads.put('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const updatedVThread = await updateProfessionalVthread(id, req.body);
        if (updatedVThread) {
            res.json(updatedVThread);
        } else {
            res.status(404).json({ error: 'VThread not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = professionalVthreads;
