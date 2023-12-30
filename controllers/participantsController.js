const express = require("express");
const participants = express.Router();
// const { ParticipantsValidationSchema } = require("../validations/checkParticipants.js");

const {
  getAllParticipants,
  getOneParticipant,
  createParticipant,
  deleteParticipant,
  updateParticipant,
} = require("../queries/participantsQueries.js");

participants.get("/", async (req, res) => {
    console.log('GET /Participants endpoint hit');
    try {
        const allParticipants = await getAllParticipants();
        console.log('Response from getAllParticipants:', allParticipants);
        if (allParticipants[0]) {
            res.status(200).json({ success: true, data: { payload: allParticipants } });
        } else {
            res.status(500).json({ success: false, data: { error: "Server Error - Participants fetch failed" } });
        }
    } catch (err) {
        console.error('Error in GET /Participants:', err);
        res.status(500).json({ success: false, data: { error: "Server Error - Participants fetch failed" } });
    }
});


participants.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const oneParticipant = await getOneParticipant(id);
    if (oneParticipant) {
      res.json(oneParticipant);
    } else {
      res.status(404).json({
        error: "not found!",
      });
    }
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

participants.post("/", validateParticipant, async (req, res) => {
  try {
    const createdParticipant = await createParticipant(req.body);
    res.json(createdParticipant);
  } catch (error) {
    res.status(400).json({ error: "Participant creation failure" });
  }
});

participants.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedParticipant = await deleteParticipant(id);
    if (deletedParticipant) {
      res.status(200).json({ success: true, payload: { data: deletedParticipant } });
    } else {
      res.status(404).json({ error: "Participant not found!" });
    }
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

participants.put("/:id", validateParticipant, async (req, res) => {
  const { id } = req.params;
  try {
      const updatedParticipant = await updateParticipant(id, req.body);
      if (updatedParticipant.id) {
          res.status(200).json(updatedParticipant);
        } else {
            res.status(404).json("no Participant found with that id");
        }
  } catch (error) {
    res.status(500).json({ error: "Update failed" });
  }
});

function validateParticipant(req, res, next) {
    const { error } = participantValidationSchema.validate(req.body);
    if (error) {
        res.status(400).json({ error: error.details[0].message });
    } else {
        next();
    }
}

module.exports = participants;
