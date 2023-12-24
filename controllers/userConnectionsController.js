const express = require("express");
const userConnections = express.Router();
const { userConnectionValidationSchema } = require("../validations/checkUserConnections.js");
const {
  getAllUserConnections,
  getOneUserConnection,
  createUserConnection,
  deleteUserConnection,
  updateUserConnection,
} = require("../queries/userConnections.js");

userConnections.get("/", async (req, res) => {
  console.log("Get userConnection endpoint hit");
  try {
    const allUserConnections = await getAllUserConnections();
    console.log("Response from getAllUserConnections:", alluserConnections);
    if (allUserConnections[0]) {
      res.status(200).json({ success: true, payload: allUserConnections }); // Wrap response in a 'payload' object
    } else {
      res
        .status(500)
        .json({
          success: false,
          data: { error: "Server Error failed to fetch userConnections" },
        });
    }
  } catch (err) {
    console.error("Error in GET /userConnections:", err);
    res
      .status(500)
      .json({
        success: false,
        data: { error: "Server Error - userConnections fetch failed" },
      });
  }
});

userConnections.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const oneUserConnection = await getOneUserConnection(id);
    if (oneUserConnection) {
      res.json(oneUserConnection);
    } else {
      res.status(404).json({ error: "userConnection not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Sever error" });
  }
});

userConnections.post("/", async (req, res) => {
  const { error } = userConnectionValidationSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const createdUserConnection = await createUserConnection(req.body);
    res.status(201).json(createdUserConnection);
  } catch (error) {
    res.status(400).json({ error: "userConnection creation failure" });
  }
});

userConnections.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUserConnection = await deleteUserConnection(id);
    if (deletedUserConnection) {
      res.status(200).json({ success: true, payload: { data: deletedUserConnection } });
    } else {
      res.status(404).json({ error: "userConnection not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

userConnections.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updatedUserConnection = await updateUserConnection(id, req.body);
    res.status(200).json(updatedUserConnection);
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
});

module.exports = userConnections;
