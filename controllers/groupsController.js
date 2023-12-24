const express = require("express");
const groups = express.Router();
const { groupValidationSchema } = require("../validations/checkGroups.js");
const {
  getAllGroups,
  getOneGroup,
  createGroup,
  deleteGroup,
  updateGroup,
} = require("../queries/groups.js");

groups.get("/", async (req, res) => {
  console.log("Get group endpoint hit");
  try {
    const allGroups = await getAllGroups();
    console.log("Response from getAllGroups:", allGroups);
    if (allGroups[0]) {
      res.status(200).json({ success: true, payload: allGroups }); // Wrap response in a 'payload' object
    } else {
      res
        .status(500)
        .json({
          success: false,
          data: { error: "Server Error failed to fetch groups" },
        });
    }
  } catch (err) {
    console.error("Error in GET /groups:", err);
    res
      .status(500)
      .json({
        success: false,
        data: { error: "Server Error - groups fetch failed" },
      });
  }
});

groups.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const OneGroup = await getOneGroup(id);
    if (OneGroup) {
      res.json(OneGroup);
    } else {
      res.status(404).json({ error: "group not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Sever error" });
  }
});

groups.post("/", async (req, res) => {
  const { error } = groupValidationSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const createdGroup = await createGroup(req.body);
    res.status(201).json(createdGroup);
  } catch (error) {
    res.status(400).json({ error: "group creation failure" });
  }
});

groups.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedGroup = await deleteGroup(id);
    if (deletedGroup) {
      res.status(200).json({ success: true, payload: { data: deletedGroup } });
    } else {
      res.status(404).json({ error: "group not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

groups.put("/:id", async (req, res) => {
    try {
  const { id } = req.params;
    const { error } = groupValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const updatedGroup = await updateGroup(id, req.body);
    res.status(200).json(updatedGroup);
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
});

module.exports = groups;
