const express = require("express");
const profiles = express.Router();
const {
  profileValidationSchema,
} = require("../validations/checkUserProfile.js");

const {
  getAllProfiles,
  getOneProfile,
  createProfile,
  deleteProfile,
  updateProfile,
} = require("../queries/usersProfiles.js");

profiles.get("/", async (req, res) => {
    console.log('GET /profiles endpoint hit');
    try {
        const allProfiles = await getAllProfiles();
        console.log('Response from getAllProfiles:', allProfiles);
        if (allProfiles[0]) {
            res.status(200).json({ success: true, data: { payload: allProfiles } });
        } else {
            res.status(500).json({ success: false, data: { error: "Server Error - profiles fetch failed" } });
        }
    } catch (err) {
        console.error('Error in GET /profiles:', err);
        res.status(500).json({ success: false, data: { error: "Server Error - profiles fetch failed" } });
    }
});
  profiles.get("/:id", async (req, res) => {
    try {
      const profile = await getOneProfile(req.params.id);
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
    try {
      const { error } = profileValidationSchema.validate(req.body);
      if (error) return res.status(400).json({ error: error.details[0].message });
  
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
    try {
      const { error } = profileValidationSchema.validate(req.body);
      if (error) return res.status(400).json({ error: error.details[0].message });
  
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
  