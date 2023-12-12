const express = require("express");
const vthreads = express.Router();
const { vthreadsValidationSchema } = require("../validations/checkVthreads.js");

const {
  getAllVthreads,
  getOneVthread,
  createVthread,
  deleteVthread,
  updateVthread,
} = require("../queries/vThreads.js");

vthreads.get("/", async (req, res) => {
  console.log("Get /vthread endpoint hit");
  try {
    const allVthreads = await getAllVthreads();
    console.log("Response from getAllVthreads:", allVthreads);
    if (allVthreads[0]) {
      res.status(200).json({ success: true, payload: allVthreads });
    } else {
      res
        .status(500)
        .json({
          success: false,
          data: { error: "Server error failed to fetch VThreads" },
        });
    }
  } catch (err) {
    console.error("Error in get /vthreads:", err);
    res
      .status(500)
      .json({
        success: false,
        data: { error: "Server Error - vthreads fetch failed" },
      });
  }
});

vthreads.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const oneVthread = await getOneVthread(id);
    if (oneVthread) {
      res.json(oneVthread);
    } else {
      res.status(404).json({ error: "VThread not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Vthread not found " });
  }
});

vthreads.post("/", async (req, res) => {
  const { error } = vthreadsValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    const createdVthread = await createVthread(req.body);
    res.status(201).json(createdVthread);
  } catch (err) {
    res.status(201).json({ error: "VThread not found" });
  }
});

vthreads.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedVthread = await deleteVthread(id);
    if (deletedVthread) {
      res.status(200).json(deletedVthread);
    } else {
      res.status(404).json({ error: "Vthread not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

vthreads.put("/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const existingVthread = await getOneVthread(id);
    if (!existingVthread) {
      return res.status(404).json({ error: "VThread not found with that id" });
    }
    const { error } = vthreadsValidationSchema.validate(req.body);
    if (error) {
      return res.status(404).json({ error: error.details[0].message });
    }
    const updatedVthread = await updateVthread(id, req.body);
    res.status(200).json(updatedVthread)
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
});

module.exports = vthreads;
