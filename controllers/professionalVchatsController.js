const express = require("express");
const professionalVchats = express.Router();
const { professionalVchatsValidationSchema } = require("../validations/checkProfessionalVchats.js");
const {
  getAllProfessionalVchats,
  getOneProfessionalVchat,
  createProfessionalVchat,
  deleteProfessionalVchat,
  updateProfessionalVchat
} = require("../queries/professionalVchats.js");

professionalVchats.get("/", async (req, res) => {
  console.log("Get vchat endpoint hit");
  try {
    const allProfessionalVchats = await getAllProfessionalVchats();
    console.log("Response from getAllProfessionalVchats:", allProfessionalVchats);
    if (allProfessionalVchats[0]) {
      res.status(200).json({ success: true, payload: allProfessionalVchats }); // Wrap response in a 'payload' object
    } else {
      res
        .status(500)
        .json({
          success: false,
          data: { error: "Server Error failed to fetch professionalVChats" },
        });
    }
  } catch (err) {
    console.error("Error in GET /professionalVchats:", err);
    res
      .status(500)
      .json({
        success: false,
        data: { error: "Server Error - professionalVchats fetch failed" },
      });
  }
});

professionalVchats.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const oneProfessionalVchat = await getOneProfessionalVchat(id);
    if (oneProfessionalVchat) {
      res.json(oneProfessionalVchat);
    } else {
      res.status(404).json({ error: "VChat not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Sever error" });
  }
});

professionalVchats.post("/", async (req, res) => {
  try {
    const createdProfessionalVchat = await createProfessionalVchat(req.body);
    res.status(201).json(createdProfessionalVchat);
  } catch (error) {
    res.status(400).json({ error: "VChat creation failure" });
  }
});

professionalVchats.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProfessionalVchat = await deleteProfessionalVchat(id);
    if (deletedProfessionalVchat) {
      res.status(200).json({ success: true, payload: { data: deletedProfessionalVchat } });
    } else {
      res.status(404).json({ error: "VChat not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

professionalVchats.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updatedProfessionalVchat = await updateProfessionalVchat(id, req.body);
    res.status(200).json(updatedProfessionalVchat);
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
});

module.exports = professionalVchats;
