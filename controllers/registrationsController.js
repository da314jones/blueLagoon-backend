const express = require('express');
const registrations = express.Router();
const {
    getAllRegistrations,
    getRegistrationById,
    createRegistration
} = require('../queries/registrationsQueries');
const { registrationsValidationSchema } = require('../validations/checkRegistrations');

registrations.get('/', async (req, res) => {
    const allRegistrations = await getAllRegistrations();
    res.json(allRegistrations);
});

registrations.get('/:registration_id', async (req, res) => {
    const registration = await getRegistrationById(req.params.registration_id);
    res.json(registration);
});

registrations.post('/', async (req, res) => {
    const validation = registrationsValidationSchema.validate(req.body);
    const newRegistration = await createRegistration(req.body);
    res.status(201).json(newRegistration);
});

module.exports = registrations;
