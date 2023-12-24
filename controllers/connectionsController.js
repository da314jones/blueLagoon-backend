const express = require("express");
const connections = express.Router();
const { connectionsValidationSchema } = require("../validations/checkConnections.js");
const {
  getAllConnections,
  getOneConnection,
  createConnection,
  deleteConnection,
  updateConnection,
} = require("../queries/connections.js");

connections.get("/", async (req, res) => {
  console.log("Get userConnection endpoint hit");
  try {
    const allConnections = await getAllConnections();
    console.log("Response from getAllConnections:", allConnections);
    if (allConnections[0]) {
      res.status(200).json({ success: true, payload: allConnections }); // Wrap response in a 'payload' object
    } else {
      res
        .status(500)
        .json({
          success: false,
          data: { error: "Server Error failed to fetch connections" },
        });
    }
  } catch (err) {
    console.error("Error in GET /connections:", err);
    res
      .status(500)
      .json({
        success: false,
        data: { error: "Server Error - connections fetch failed" },
      });
  }
});

connections.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const oneConnection = await getOneConnection(id);
    if (oneConnection) {
      res.json(oneConnection);
    } else {
      res.status(404).json({ error: "Connection not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Sever error" });
  }
});

connections.post("/", async (req, res) => {
  const { error } = connectionsValidationSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const createdConnection = await createConnection(req.body);
    res.status(201).json(createdConnection);
  } catch (error) {
    res.status(400).json({ error: "userConnection creation failure" });
  }
});

connections.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUserConnection = await deleteConnection(id);
    if (deletedUserConnection) {
      res.status(200).json({ success: true, payload: { data: deletedUserConnection } });
    } else {
      res.status(404).json({ error: "userConnection not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

connections.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updatedConnection = await updateConnection(id, req.body);
    res.status(200).json(updatedConnection);
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
});

module.exports = connections;
