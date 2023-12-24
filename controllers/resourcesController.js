const express = require("express");
const resources = express.Router();
const { resourcesValidationSchema } = require("../validations/checkresources.js");
const {
  getAllResources,
  getOneResource,
  createResource,
  deleteResource,
  updateResource,
} = require("../queries/resources.js");

resources.get("/", async (req, res) => {
  console.log("Get resource endpoint hit");
  try {
    const allResources = await getAllResources();
    console.log("Response from getAllResources:", allResources);
    if (allResources[0]) {
      res.status(200).json({ success: true, payload: allResources }); // Wrap response in a 'payload' object
    } else {
      res
        .status(500)
        .json({
          success: false,
          data: { error: "Server Error failed to fetch resources" },
        });
    }
  } catch (err) {
    console.error("Error in GET /resources:", err);
    res
      .status(500)
      .json({
        success: false,
        data: { error: "Server Error - resources fetch failed" },
      });
  }
});

resources.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const oneResource = await getOneResource(id);
    if (oneResource) {
      res.json(oneResource);
    } else {
      res.status(404).json({ error: "resource not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Sever error" });
  }
});

resources.post("/", async (req, res) => {
  const { error } = resourcesValidationSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const createdResource = await createResource(req.body);
    res.status(201).json(createdResource);
  } catch (error) {
    res.status(400).json({ error: "resource creation failure" });
  }
});

resources.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedResource = await deleteResource(id);
    if (deletedResource) {
      res.status(200).json({ success: true, payload: { data: deletedResource } });
    } else {
      res.status(404).json({ error: "resource not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

resources.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updatedResource = await updateResource(id, req.body);
    res.status(200).json(updatedResource);
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
});

module.exports = resources;
