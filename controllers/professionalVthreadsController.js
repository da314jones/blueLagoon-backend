const express = require("express");
const professionalVthreads = express.Router();
const { professionalVthreadsValidationSchema } = require("../validations/checkProfessionalVthreads.js");
const {
  getAllProfessionalVthreads,
  getOneProfessionalVthread,
  createProfessionalVthread,
  deleteProfessionalVthread,
  updateProfessionalVthread,
} = require("../queries/professionalVthreads.js");

professionalVthreads.get("/", async (req, res) => {
  console.log("Get professionalVthreads endpoint hit");
  try {
    const allProfessionalVthreads = await getAllProfessionalVthreads();
    console.log("Response from getAllProfessionalVthreads:", allProfessionalVthreads);
    if (allProfessionalVthreads[0]) {
      res.status(200).json({ success: true, payload: allProfessionalVthreads }); // Wrap response in a 'payload' object
    } else {
      res
        .status(500)
        .json({
          success: false,
          data: { error: "Server Error failed to fetch professionalVthreads" },
        });
    }
  } catch (err) {
    console.error("Error in GET /professionalVthreads:", err);
    res
      .status(500)
      .json({
        success: false,
        data: { error: "Server Error - professionalVthreads fetch failed" },
      });
  }
});

professionalVthreads.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const oneProfessionalVthreads = await getOneProfessionalVthread(id);
    if (oneProfessionalVthreads) {
      res.json(oneProfessionalVthreads);
    } else {
      res.status(404).json({ error: "professionalVthreads not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Sever error" });
  }
});

professionalVthreads.post("/", async (req, res) => {
  const { error } = professionalVthreadsValidationSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const createdProfessionalVthreads = await createProfessionalVthread(req.body);
    res.status(201).json(createdProfessionalVthreads);
  } catch (error) {
    res.status(400).json({ error: "professionalVthreads creation failure" });
  }
});

professionalVthreads.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProfessionalVthreads = await deleteProfessionalVthread(id);
    if (deletedProfessionalVthreads) {
      res.status(200).json({ success: true, payload: { data: deletedProfessionalVthreads } });
    } else {
      res.status(404).json({ error: "professionalVthreads not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

professionalVthreads.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updatedProfessionalVthreads = await updateProfessionalVthread(id, req.body);
    res.status(200).json(updatedProfessionalVthreads);
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
});

module.exports = professionalVthreads;
