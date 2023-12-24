const express = require("express");
const userConsentLogs = express.Router();
const { userConsentLogsValidationSchema } = require("../validations/checkUserConsentLogs.js");
const {
  getAllUserConsentLogs,
  getOneUserConsentLog,
  createUserConsentLog
} = require("../queries/userConsentsLogs.js");

userConsentLogs.get("/", async (req, res) => {
  console.log("Get userConsentLog endpoint hit");
  try {
    const allUserConsentLogs = await getAllUserConsentLogs();
    console.log("Response from getAllUserConsentLogs:", allUserConsentLogs);
    if (allUserConsentLogs[0]) {
      res.status(200).json({ success: true, payload: allUserConsentLogs }); // Wrap response in a 'payload' object
    } else {
      res
        .status(500)
        .json({
          success: false,
          data: { error: "Server Error failed to fetch userConsentLogs" },
        });
    }
  } catch (err) {
    console.error("Error in GET /userConsentLogs:", err);
    res
      .status(500)
      .json({
        success: false,
        data: { error: "Server Error - userConsentLogs fetch failed" },
      });
  }
});

userConsentLogs.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const oneUserConsentLog = await getOneUserConsentLog(id);
    if (oneUserConsentLog) {
      res.json(oneUserConsentLog);
    } else {
      res.status(404).json({ error: "userConsentLog not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Sever error" });
  }
});

userConsentLogs.post("/", async (req, res) => {
  const { error } = userConsentLogValidationSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const createdUserConsentLog = await createUserConsentLog(req.body);
    res.status(201).json(createdUserConsentLog);
  } catch (error) {
    res.status(400).json({ error: "userConsentLog creation failure" });
  }
});


module.exports = userConsentLogs;
