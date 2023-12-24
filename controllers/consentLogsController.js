const express = require("express");
const consentLogs = express.Router();
const { consentLogsValidationSchema } = require("../validations/checkConsentLogs.js");
const {
  getAllConsentLogs,
  getOneConsentLog,
  createConsentLog
} = require("../queries/consentsLogs.js");

consentLogs.get("/", async (req, res) => {
  console.log("Get userConsentLog endpoint hit");
  try {
    const allConsentLogs = await getAllConsentLogs();
    console.log("Response from getAllConsentLogs:", allConsentLogs);
    if (allConsentLogs[0]) {
      res.status(200).json({ success: true, payload: allConsentLogs }); // Wrap response in a 'payload' object
    } else {
      res
        .status(500)
        .json({
          success: false,
          data: { error: "Server Error failed to fetch consentLogs" },
        });
    }
  } catch (err) {
    console.error("Error in GET /consentLogs:", err);
    res
      .status(500)
      .json({
        success: false,
        data: { error: "Server Error - consentLogs fetch failed" },
      });
  }
});

consentLogs.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const oneConsentLog = await getOneConsentLog(id);
    if (oneConsentLog) {
      res.json(oneConsentLog);
    } else {
      res.status(404).json({ error: "ConsentLog not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Sever error" });
  }
});

consentLogs.post("/", async (req, res) => {
  const { error } = consentLogValidationSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const createdConsentLog = await createConsentLog(req.body);
    res.status(201).json(createdConsentLog);
  } catch (error) {
    res.status(400).json({ error: "ConsentLog creation failure" });
  }
});


module.exports = consentLogs;
