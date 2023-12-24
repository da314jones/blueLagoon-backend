const express = require("express");
const userRegistrations = express.Router();
const { registrationsValidationSchema } = require("../validations/checkUserRegisters");
const {
    getAllRegistrations,
    getRegistrationById,
    createRegistration,
    deleteRegistration,
    updateRegistration
} = require("../queries/userRegistrations");

userRegistrations.get("/", async (req, res) => {
    try {
        const registrations = await getAllRegistrations();
        res.json(registrations);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

userRegistrations.get("/:id", async (req, res) => {
    try {
        const registration = await getRegistrationById(req.params.id);
        if (registration) {
            res.json(registration);
        } else {
            res.status(404).json({ error: "Registration not found" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

userRegistrations.post("/", async (req, res) => {
    const { error } = registrationValidationSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
        const newRegistration = await createRegistration(req.body);
        res.status(201).json(newRegistration);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

userRegistrations.delete("/:id", async (req, res) => {
    try {
        const deletedRegistration = await deleteRegistration(req.params.id);
        if (deletedRegistration) {
            res.json(deletedRegistration);
        } else {
            res.status(404).json({ error: "Registration not found" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

userRegistrations.put("/:id", async (req, res) => {
    const { error } = registrationValidationSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
        const updatedRegistration = await updateRegistration(req.params.id, req.body);
        if (updatedRegistration) {
            res.json(updatedRegistration);
        } else {
            res.status(404).json({ error: "Registration not found" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = userRegistrations;
