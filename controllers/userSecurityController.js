const express = require("express");
const userSecurity = express.Router();
const { userSecurityValidationSchema } = require("../validations/userSecurityValidation");
const {
    getAllUserSecurity,
    getUserSecurityById,
    createUserSecurity,
    deleteUserSecurity,
    updateUserSecurity
} = require("../queries/userSecurityQueries");

userSecurity.get("/", async (req, res) => {
    try {
        const allEntries = await getAllUserSecurity();
        res.json(allEntries);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

userSecurity.get("/:id", async (req, res) => {
    try {
        const entry = await getUserSecurityById(req.params.id);
        if (entry) {
            res.json(entry);
        } else {
            res.status(404).json({ error: "Entry not found" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

userSecurity.post("/", async (req, res) => {
    const { error } = userSecurityValidationSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
        const newEntry = await createUserSecurity(req.body);
        res.status(201).json(newEntry);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

userSecurity.delete("/:id", async (req, res) => {
    try {
        const deletedEntry = await deleteUserSecurity(req.params.id);
        if (deletedEntry) {
            res.json(deletedEntry);
        } else {
            res.status(404).json({ error: "Entry not found" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

userSecurity.put("/:id", async (req, res) => {
    const { error } = userSecurityValidationSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
        const updatedEntry = await updateUserSecurity(req.params.id, req.body);
        if (updatedEntry) {
            res.json(updatedEntry);
        } else {
            res.status(404).json({ error: "Entry not found" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = userSecurity;
