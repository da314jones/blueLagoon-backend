const express = require('express');
const profiles = express.Router();
const {
    getAllProfiles,
    getProfileById,
    createProfile
} = require('../queries/profilesQueries');
const { profilesValidationSchema } = require('../validations/checkProfiles');

profiles.get('/', async (req, res) => {
    try {
        const allProfiles = await getAllProfiles();
        res.json(allProfiles);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

profiles.get('/:profile_id', async (req, res) => {
    try {
        const profile = await getProfileById(req.params.profile_id);
        if (profile) {
            res.json(profile);
        } else {
            res.status(404).send('Profile not found');
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

profiles.post('/', async (req, res) => {
    try {
        const { error, value } = profilesValidationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const newProfile = await createProfile(value);
        res.status(201).json(newProfile);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = profiles;
