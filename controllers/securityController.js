const express = require('express');
const security = express.Router();
const {
    getAllSecurityRecords,
    getSecurityRecordById,
    createSecurityRecord
} = require('../queries/securityQueries');
const { securityValidationSchema } = require('../validations/checkSecurity');

security.get('/', async (req, res) => {
    try {
        const allSecurityRecords = await getAllSecurityRecords();
        res.json(allSecurityRecords);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

security.get('/:security_id', async (req, res) => {
    try {
        const securityRecord = await getSecurityRecordById(req.params.security_id);
        if (securityRecord) {
            res.json(securityRecord);
        } else {
            res.status(404).send('Security record not found');
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

security.post('/', async (req, res) => {
    try {
        const { error, value } = securityValidationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const newSecurityRecord = await createSecurityRecord(value);
        res.status(201).json(newSecurityRecord);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = security;
