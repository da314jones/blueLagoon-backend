const express = require("express");
const mentorships = express.Router();
const { mentorshipsValidationSchema } = require("../validations/checkMentorships.js");
const {
  getAllMentorships,
  getOneMentorship,
  createMentorship,
  deleteMentorship,
  updateMentorship
} = require("../queries/mentorships.js");

mentorships.get("/", async (req, res) => {
  console.log("Get Mentorship endpoint hit");
  try {
    const allMentorships = await getAllMentorships();
    console.log("Response from getAllMentorships:", allMentorships);
    if (allMentorships[0]) {
      res.status(200).json({ success: true, payload: allMentorships }); // Wrap response in a 'payload' object
    } else {
      res
        .status(500)
        .json({
          success: false,
          data: { error: "Server Error failed to fetch mentorships" },
        });
    }
  } catch (err) {
    console.error("Error in GET /mentorships:", err);
    res
      .status(500)
      .json({
        success: false,
        data: { error: "Server Error - mentorships fetch failed" },
      });
  }
});

mentorships.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const oneMentorship = await getOneMentorship(id);
    if (oneMentorship) {
      res.json(oneMentorship);
    } else {
      res.status(404).json({ error: "Mentorship not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Sever error" });
  }
});

mentorships.post("/", async (req, res) => {
  try {
    const createdMentorship = await createMentorship(req.body);
    res.status(201).json(createdMentorship);
  } catch (error) {
    res.status(400).json({ error: "Mentorship creation failure" });
  }
});

mentorships.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMentorship = await deleteMentorship(id);
    if (deletedMentorship) {
      res.status(200).json({ success: true, payload: { data: deletedMentorship } });
    } else {
      res.status(404).json({ error: "Mentorship not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

mentorships.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const existingMentorship = await getOneMentorship(id); // Check if the Mentorship exists
    if (!existingMentorship) {
      return res.status(404).json({ error: "Mentorship not found with that id" });
    }

    const { error } = MentorshipValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const updatedMentorship = await updateMentorship(id, req.body);
    res.status(200).json(updatedMentorship);
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
});

module.exports = mentorships;
