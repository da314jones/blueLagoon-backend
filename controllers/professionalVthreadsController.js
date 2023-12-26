const express = require('express');
const professionalVthreads = express.Router();
const { professionalVthreadsValidationSchema } = require('../validations/checkProfessionalVthreads');
const {
    getAllProfessionalVthreads,
    getProfessionalVthreadById,
    createProfessionalVthread,
    updateProfessionalVthread,
    deleteProfessionalVthread
} = require('../queries/professionalVthreadsQueries');

professionalVthreads.get('/', async (req, res) => {
    try {
        const vthreads = await getAllProfessionalVthreads();
        res.json(vthreads);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

professionalVthreads.get('/:id', async (req, res) => {
    try {
        const vthread = await getProfessionalVthreadById(req.params.id);
        if (vthread) {
            res.json(vthread);
        } else {
            res.status(404).send('Vthread not found');
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

professionalVthreads.post('/', async (req, res) => {
    try {
        const validation = professionalVthreadsValidationSchema.validate(req.body);
        if (validation.error) {
            return res.status(400).json({ error: validation.error.details[0].message });
        }
        const vthread = await createProfessionalVthread(req.body);
        res.status(201).json(vthread);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

professionalVthreads.put('/:id', async (req, res) => {
    try {
        const validation = professionalVthreadsValidationSchema.validate(req.body);
        if (validation.error) {
            return res.status(400).json({ error: validation.error.details[0].message });
        }
        const updatedVthread = await updateProfessionalVthread(req.params.id, req.body);
        if (updatedVthread) {
            res.json(updatedVthread);
        } else {
            res.status(404).send('Vthread not found');
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

professionalVthreads.delete('/:id', async (req, res) => {
    try {
        const deletedVthread = await deleteProfessionalVthread(req.params.id);
        if (deletedVthread) {
            res.json(deletedVthread);
        } else {
            res.status(404).send('Vthread not found');
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = professionalVthreads;
