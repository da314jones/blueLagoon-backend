const express = require("express");
const vchats = express.Router();
const { vchatValidationSchema } = require("../validations/checkVchats.js");
const {
  getAllVChats,
  getOneVChat,
  createVChat,
  deleteVChat,
  updateVChat,
} = require("../queries/vChats.js");

vchats.get("/", async (req, res) => {
  console.log("Get /vchat endpoint hit");
  try {
    const allVchats = await getAllVChats();
    console.log("Response from getAllVchats:", allVchats);
    if (allVchats[0]) {
      res.status(200).json({ success: true, payload: allVchats }); // Wrap response in a 'payload' object
    } else {
      res
        .status(500)
        .json({
          success: false,
          data: { error: "Server Error failed to fetch VChats" },
        });
    }
  } catch (err) {
    console.error("Error in GET /vchats:", err);
    res
      .status(500)
      .json({
        success: false,
        data: { error: "Server Error - vchats fetch failed" },
      });
  }
});

vchats.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const oneVchat = await getOneVChat(id);
    if (oneVchat) {
      res.json(oneVchat);
    } else {
      res.status(404).json({ error: "VChat not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Sever error" });
  }
});

vchats.post("/", async (req, res) => {
  const { error } = vchatValidationSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const createdVchat = await createVChat(req.body);
    res.status(201).json(createdVchat);
  } catch (error) {
    res.status(400).json({ error: "VChat creation failure" });
  }
});

vchats.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedVchat = await deleteVChat(id);
    if (deletedVchat) {
      res.status(200).json({ success: true, payload: { data: deletedVchat } });
    } else {
      res.status(404).json({ error: "VChat not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

vchats.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const existingVchat = await getOneVChat(id); // Check if the VChat exists
    if (!existingVchat) {
      return res.status(404).json({ error: "VChat not found with that id" });
    }

    const { error } = vchatValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const updatedVchat = await updateVChat(id, req.body);
    res.status(200).json(updatedVchat);
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
});

module.exports = vchats;
