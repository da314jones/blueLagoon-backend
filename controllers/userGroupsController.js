const express = require("express");
const userGroups = express.Router();
const { userGroupsValidationSchema } = require("../validations/checkUserGroups.js");
const {
  getAllUserGroups,
  getOneUserGroup,
  createUserGroup,
  deleteUserGroup,
  updateUserGroup,
} = require("../queries/userGroups.js");

userGroups.get("/", async (req, res) => {
  console.log("Get userGroup endpoint hit");
  try {
    const allUserGroups = await getAllUserGroups();
    console.log("Response from getAllUserGroups:", allUserGroups);
    if (allUserGroups[0]) {
      res.status(200).json({ success: true, payload: allUserGroups }); // Wrap response in a 'payload' object
    } else {
      res
        .status(500)
        .json({
          success: false,
          data: { error: "Server Error failed to fetch userGroups" },
        });
    }
  } catch (err) {
    console.error("Error in GET /userGroups:", err);
    res
      .status(500)
      .json({
        success: false,
        data: { error: "Server Error - userGroups fetch failed" },
      });
  }
});

userGroups.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const oneUserGroup = await getOneUserGroup(id);
    if (oneUserGroup) {
      res.json(oneUserGroup);
    } else {
      res.status(404).json({ error: "userGroup not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Sever error" });
  }
});

userGroups.post("/", async (req, res) => {
  const { error } = userGroupValidationSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const createdUserGroup = await createUserGroup(req.body);
    res.status(201).json(createdUserGroup);
  } catch (error) {
    res.status(400).json({ error: "userGroup creation failure" });
  }
});

userGroups.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUserGroup = await deleteUserGroup(id);
    if (deletedUserGroup) {
      res.status(200).json({ success: true, payload: { data: deletedUserGroup } });
    } else {
      res.status(404).json({ error: "userGroup not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

userGroups.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {    const updatedUserGroup = await updateUserGroup(id, req.body);
    res.status(200).json(updatedUserGroup);
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
});

module.exports = userGroups;
