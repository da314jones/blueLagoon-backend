const express = require("express");
const registrations = express.Router();
const { registrationsValidationSchema } = require("../validations/checkRegistrations");
const {
    getAllRegistrations,
    getRegistrationById,
    createRegistration,
    deleteRegistration,
    updateRegistration
} = require("../queries/registrations");

registrations.get("/", async (req, res) => {
    try {
        const allRegistrations = await getAllRegistrations();
        res.json(allRegistrations);
    } catch (err) {
        res.status(500).json({ error: "Server Error - failed to fetch registrations" });
    }
});

registrations.get("/:id", async (req, res) => {
    try {
        const registration = await getRegistrationById(req.params.id);
        if (registration) {
            res.json(registration);
        } else {
            res.status(404).json({ error: "Registration not found" });
        }
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

registrations.post("/", async (req, res) => {
    const { error } = registrationsValidationSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
        const newRegistration = await createRegistration(req.body);
        res.status(201).json(newRegistration);
    } catch (err) {
        res.status(500).json({ error: "Registration creation failure" });
    }
});

registrations.delete("/:id", async (req, res) => {
    try {
        const deletedRegistration = await deleteRegistration(req.params.id);
        if (deletedRegistration) {
            res.status(200).json({ success: true, payload: deletedRegistration });
        } else {
            res.status(404).json({ error: "Registration not found" });
        }
    } catch (err) {
        res.status(500).json({ error: "Server error - failed to delete registration" });
    }
});

registrations.put("/:id", async (req, res) => {
    const { error } = registrationsValidationSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
        const existingRegistration = await getRegistrationById(req.params.id);
        if (!existingRegistration) {
            return res.status(404).json({ error: "Registration not found" });
        }

        const updatedRegistration = await updateRegistration(req.params.id, req.body);
        res.status(200).json(updatedRegistration);
    } catch (err) {
        res.status(500).json({ error: "Server error - failed to update registration" });
    }
});

module.exports = registrations;
