const express = require("express");
const security = express.Router();
const {
    getAllSecurity,
    getSecurityById,
    createSecurity,
    deleteSecurity,
    updateSecurity
} = require("../queries/security.js");
const { securityValidationSchema } = require("../validations/checkSecurity.js");

security.get("/", async (req, res) => {
    try {
        const allSecurity = await getAllSecurity();
        res.json(allSecurity);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

security.get("/:id", async (req, res) => {
    try {
        const entry = await getSecurityById(req.params.id);
        if (entry) {
            res.json(entry);
        } else {
            res.status(404).json({ error: "Entry not found" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

security.post("/", async (req, res) => {
    const { error } = securityValidationSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
        const newEntry = await createSecurity(req.body);
        res.status(201).json(newEntry);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

security.delete("/:id", async (req, res) => {
    try {
        const deletedSecurity = await deleteSecurity(req.params.id);
        if (deletedSecurity) {
            res.json(deletedSecurity);
        } else {
            res.status(404).json({ error: "Entry not found" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

security.put("/:id", async (req, res) => {
    const { error } = securityValidationSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
        const updatedSecurity = await updateSecurity(req.params.id, req.body);
        if (updatedSecurity) {
            res.json(updatedSecurity);
        } else {
            res.status(404).json({ error: "Entry not found" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = security;
