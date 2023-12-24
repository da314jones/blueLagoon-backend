const express = require("express");
const emergencyContacts = express.Router();
const { validateEmergencyContact } = require("../validations/checkEmergencyContacts.js");

const {
  getAllEmergencyContacts,
  getOneEmergencyContact,
  createEmergencyContact,
  deleteEmergencyContact,
  updateEmergencyContact,
} = require("../queries/emergencyContacts.js");

emergencyContacts.get("/", async (req, res) => {
    console.log('GET /emergencyContacts endpoint hit');
    try {
        const allEmergencyContacts = await getAllEmergencyContacts();
        console.log('Response from getAllEmergencyContacts:', allEmergencyContacts);
        if (allEmergencyContacts[0]) {
            res.status(200).json({ success: true, data: { payload: allEmergencyContacts } });
        } else {
            res.status(500).json({ success: false, data: { error: "Server Error - emergencyContacts fetch failed" } });
        }
    } catch (err) {
        console.error('Error in GET /emergencyContacts:', err);
        res.status(500).json({ success: false, data: { error: "Server Error - emergencyContacts fetch failed" } });
    }
});


emergencyContacts.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const oneEmergencyContact = await getOneEmergencyContact(id);
    if (oneEmergencyContact) {
      res.json(oneEmergencyContact);
    } else {
      res.status(404).json({
        error: "not found!",
      });
    }
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

emergencyContacts.post("/", validateEmergencyContact, async (req, res) => {
  try {
    const createdEmergencyContact = await createEmergencyContact(req.body);
    res.status(201).json(createdEmergencyContact);
  } catch (error) {
    res.status(400).json({ error: "emergencyContact creation failure" });
  }
});

emergencyContacts.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEmergencyContact = await deleteEmergencyContact(id);
    if (deletedEmergencyContact) {
      res.status(200).json({ success: true, payload: { data: deletedEmergencyContact } });
    } else {
      res.status(404).json({ error: "emergencyContact not found!" });
    }
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

emergencyContacts.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
      const updatedEmergencyContact = await updateEmergencyContact(id, req.body);
      if (updatedEmergencyContact.id) {
          res.status(200).json(updatedEmergencyContact);
        } else {
            res.status(404).json("no emergencyContact found with that id");
        }
  } catch (error) {
    res.status(500).json({ error: "Update failed" });
  }
});



module.exports = emergencyContacts;
