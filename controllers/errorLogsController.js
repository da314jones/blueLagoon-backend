const express = require("express");
const errorLogs = express.Router();
const { errorLogsValidationSchema } = require("../validations/checkErrorLogs.js");

const {
  getAllErrorLogs,
  getOneErrorLog
} = require("../queries/errorLogs.js");

errorLogs.get("/", async (req, res) => {
    console.log('GET /errorLogs endpoint hit');
    try {
        const allErrorLogs = await getAllErrorLogs();
        console.log('Response from getAllErrorLogs:', allErrorLogs);
        if (allErrorLogs[0]) {
            res.status(200).json({ success: true, data: { payload: allErrorLogs } });
        } else {
            res.status(500).json({ success: false, data: { error: "Server Error - errorLogs fetch failed" } });
        }
    } catch (err) {
        console.error('Error in GET /errorLogs:', err);
        res.status(500).json({ success: false, data: { error: "Server Error - errorLogs fetch failed" } });
    }
});


errorLogs.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const oneErrorLog = await getOneErrorLog(id);
    if (oneErrorLog) {
      res.json(oneErrorLog);
    } else {
      res.status(404).json({
        error: "not found!",
      });
    }
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});





module.exports = errorLogs;
