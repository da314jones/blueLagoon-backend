const express = require("express");
const chatMessages = express.Router();
const { chatMessagesValidationSchema } = require("../validations/checkChatMessages.js");
const {
  getAllMessages,
  getOneMessage,
  createMessage,
  deleteMessage,
  updateMessage
} = require("../queries/chatMessages.js");

chatMessages.get("/", async (req, res) => {
  try {
    const allMessages = await getAllMessages();
    res.status(200).json(allMessages);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

chatMessages.get("/:id", async (req, res) => {
  try {
    const message = await getOneMessage(req.params.id);
    res.json(message);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

chatMessages.post("/", async (req, res) => {
    try {
      const { error } = chatMessagesValidationSchema.validate(req.body);
      if (error) return res.status(400).json({ error: error.details[0].message });
  
      const newMessage = await createMessage(req.body);
      res.status(201).json(newMessage);
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  });
  
 
  chatMessages.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deletedMessage = await deleteMessage(id);
      res.json(deletedMessage);
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  });
  
  chatMessages.put("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { error } = chatMessagesValidationSchema.validate(req.body);
      if (error) return res.status(400).json({ error: error.details[0].message });
  
      const updatedMessage = await updateMessage(id, req.body);
      res.json(updatedMessage);
    } catch (err) {
      res.status(500).json({ error: "Update failed" });
    }
  });
  
  
  
  module.exports = chatMessages;
  