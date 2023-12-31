const express = require("express");
const vchats = express.Router();
require("dotenv").config();
const openTok = require("../service/openTokService.js");
const { vchatsValidationSchema } = require("../validations/checkVchats.js");
const {
    getAllVChats,
    getOneVChat,
    createVChat,
    deleteVChat,
    updateVChat,
} = require("../queries/vchatsQueries.js");
const generateSessionId = require("../service/generateSessionId.js");

function validateVChat(req, res, next) {
  const { error } = vchatsValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  } else {
    next();
  }
}

const openTokService = require('../service/openTokService');

vchats.get("/session", async (req, res) => {
    try {
        // Generate session ID
        const sessionId = await openTokService.createSessionAsync();

        // Generate token using the session ID
        const token = openTokService.generateToken(sessionId);

        // Send the response with session ID and token
        res.json({
            apiKey: process.env.OPENTOK_API_KEY,
            sessionId,
            token
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});


vchats.get("/", async (req, res) => {

  try {
    const allVChats = await getAllVChats();
    if (allVChats.length) {
      res.status(200).json({ id: nanoid(), allVChats });
    } else {
      res.status(404).json({ success: false, error: "No vchats found" });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
});

vchats.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const oneVChat = await getOneVChat(id);
    if (oneVChat) {
      res.status(200).json(oneVChat);
    } else {
      res.status(404).json({ error: "VChat not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

vchats.post("/", validateVChat, async (req, res) => {
  try {
    const createdVChat = await createVChat(req.body);
    res.status(201).json(createdVChat);
  } catch (err) {
    res.status(500).json({ error: "Error creating vchat" });
  }
});

vchats.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedVChat = await deleteVChat(id);
    if (deletedVChat) {
      res.status(200).json({ message: "VChat successfully deleted" });
    } else {
      res.status(404).json({ error: "VChat not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

vchats.put("/:id", validateVChat, async (req, res) => {
  const { id } = req.params;
  try {
    const updatedVChat = await updateVChat(id, req.body);
    if (updatedVChat) {
      res.status(200).json({ updatedVChat });
    } else {
      res.status(404).json({ error: "VChat not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Error updating vchat" });
  }
});

module.exports = vchats;
