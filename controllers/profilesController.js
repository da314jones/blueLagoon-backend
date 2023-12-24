const express = require("express");
const profiles = express.Router();
const { profilesValidationSchema } = require("../validations/checkProfiles.js");
const {
    getAllProfiles,
    getOneProfile,
    createProfile,
    deleteProfile,
    updateProfile
} = require("../queries/profiles.js");

profiles.get("/", async (req, res) => {
    try {
        const allProfiles = await getAllProfiles();
        res.status(200).json({ success: true, payload: allProfiles });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

profiles.get("/id", async (req, res) => {
    const { id } = req.params
    try {
         const profile = await getOneProfile(id);
         if (profile) {
            res.json(profile);
          } else {
            res.status(404).json({ error: "Profile not found" });
          }
        res.status(200).json(profile);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

profiles.post("/", async (req, res) => {
    const { error } = profilesValidationSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
        const createdProfile = await createProfile(req.body);
        res.status(201).json(createdProfile);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

profiles.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deletedProfile = await deleteProfile(req.params.profile_id);
        res.json(deletedProfile);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

profiles.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { error } = profilesValidationSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
        const updatedProfile = await updateProfile(req.params.profile_id, req.body);
        res.json(updatedProfile);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = profiles;
