const express = require("express");
const profiles = express.Router();
const { profileValidationSchema } = require("../validations/profilesValidation");
const {
    getAllProfiles,
    getProfileById,
    createProfile,
    deleteProfile,
    updateProfile
} = require("../queries/profilesQueries");

profiles.get("/", async (req, res) => {
    try {
        const profiles = await getAllProfiles();
        res.json(profiles);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

profiles.get("/:id", async (req, res) => {
    try {
        const profile = await getProfileById(req.params.id);
        if (profile) {
            res.json(profile);
        } else {
            res.status(404).json({ error: "Profile not found" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

profiles.post("/", async (req, res) => {
    const { error } = profileValidationSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
        const newProfile = await createProfile(req.body);
        res.status(201).json(newProfile);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

profiles.delete("/:id", async (req, res) => {
    try {
        const deletedProfile = await deleteProfile(req.params.id);
        if (deletedProfile) {
            res.json(deletedProfile);
        } else {
            res.status(404).json({ error: "Profile not found" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

profiles.put("/:id", async (req, res) => {
    const { error } = profileValidationSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
        const updatedProfile = await updateProfile(req.params.id, req.body);
        if (updatedProfile) {
            res.json(updatedProfile);
        } else {
            res.status(404).json({ error: "Profile not found" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = profiles;
