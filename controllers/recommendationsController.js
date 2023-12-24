const express = require("express");
const recommendations = express.Router();
const { recommendationsValidationSchema } = require("../validations/checkRecommendations.js");
const {
  getAllRecommendations,
  getOneRecommendation,
  createRecommendation,
  deleteRecommendation,
  updateRecommendation,
} = require("../queries/recommendations.js");

recommendations.get("/", async (req, res) => {
  console.log("Get recommendation endpoint hit");
  try {
    const allRecommendations = await getAllRecommendations();
    console.log("Response from getAllRecommendations:", allRecommendations);
    if (allRecommendations[0]) {
      res.status(200).json({ success: true, payload: allRecommendations }); // Wrap response in a 'payload' object
    } else {
      res
        .status(500)
        .json({
          success: false,
          data: { error: "Server Error failed to fetch recommendations" },
        });
    }
  } catch (err) {
    console.error("Error in GET /recommendations:", err);
    res
      .status(500)
      .json({
        success: false,
        data: { error: "Server Error - recommendations fetch failed" },
      });
  }
});

recommendations.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const oneRecommendation = await getOneRecommendation(id);
    if (oneRecommendation) {
      res.json(oneRecommendation);
    } else {
      res.status(404).json({ error: "recommendation not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Sever error" });
  }
});

recommendations.post("/", async (req, res) => {
  const { error } = recommendationValidationSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const createdRecommendation = await createRecommendation(req.body);
    res.status(201).json(createdRecommendation);
  } catch (error) {
    res.status(400).json({ error: "recommendation creation failure" });
  }
});

recommendations.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRecommendation = await deleteRecommendation(id);
    if (deletedRecommendation) {
      res.status(200).json({ success: true, payload: { data: deletedRecommendation } });
    } else {
      res.status(404).json({ error: "recommendation not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

recommendations.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updatedRecommendation = await updateRecommendation(id, req.body);
    res.status(200).json(updatedRecommendation);
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
});

module.exports = recommendations;
