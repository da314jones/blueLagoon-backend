const express = require("express");
const reviews = express.Router();
const { reviewValidationSchema } = require("../validations/checkreviews.js");
const {
  getAllReviews,
  getOneReview,
  createReview,
  deleteReview,
  updateReview,
} = require("../queries/reviews.js");

reviews.get("/", async (req, res) => {
  console.log("Get review endpoint hit");
  try {
    const allReviews = await getAllReviews();
    console.log("Response from getAllReviews:", allReviews);
    if (allReviews[0]) {
      res.status(200).json({ success: true, payload: allReviews }); // Wrap response in a 'payload' object
    } else {
      res
        .status(500)
        .json({
          success: false,
          data: { error: "Server Error failed to fetch reviews" },
        });
    }
  } catch (err) {
    console.error("Error in GET /reviews:", err);
    res
      .status(500)
      .json({
        success: false,
        data: { error: "Server Error - reviews fetch failed" },
      });
  }
});

reviews.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const oneReview = await getOneReview(id);
    if (oneReview) {
      res.json(oneReview);
    } else {
      res.status(404).json({ error: "review not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Sever error" });
  }
});

reviews.post("/", async (req, res) => {
  const { error } = reviewValidationSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const createdReview = await createReview(req.body);
    res.status(201).json(createdReview);
  } catch (error) {
    res.status(400).json({ error: "review creation failure" });
  }
});

reviews.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedReview = await deleteReview(id);
    if (deletedReview) {
      res.status(200).json({ success: true, payload: { data: deletedReview } });
    } else {
      res.status(404).json({ error: "review not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

reviews.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updatedReview = await updateReview(id, req.body);
    res.status(200).json(updatedReview);
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
});

module.exports = reviews;
