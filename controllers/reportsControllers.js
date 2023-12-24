const express = require("express");
const reports = express.Router();
const { reportsValidationSchema } = require("../validations/checkReports.js");
const {
  getAllReports,
  getOneReport,
  createReport,
  deleteReport,
  updateReport,
} = require("../queries/reports.js");

reports.get("/", async (req, res) => {
  console.log("Get Reports endpoint hit");
  try {
    const allReports = await getAllReports();
    console.log("Response from getAllReports:", allReports);
    if (allReports[0]) {
      res.status(200).json({ success: true, payload: allReports }); // Wrap response in a 'payload' object
    } else {
      res
        .status(500)
        .json({
          success: false,
          data: { error: "Server Error failed to fetch reports" },
        });
    }
  } catch (err) {
    console.error("Error in GET /reports:", err);
    res
      .status(500)
      .json({
        success: false,
        data: { error: "Server Error - reports fetch failed" },
      });
  }
});

reports.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const oneReport = await getOneReport(id);
    if (oneReport) {
      res.json(oneReport);
    } else {
      res.status(404).json({ error: "Reports not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Sever error" });
  }
});

reports.post("/", async (req, res) => {
  const { error } = reportsValidationSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const createdReport = await createReport(req.body);
    res.status(201).json(createdReport);
  } catch (error) {
    res.status(400).json({ error: "Reports creation failure" });
  }
});

reports.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedReport = await deleteReport(id);
    if (deletedReport) {
      res.status(200).json({ success: true, payload: { data: deletedReport } });
    } else {
      res.status(404).json({ error: "Reports not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

reports.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updatedReport = await updateReport(id, req.body);
    res.status(200).json(updatedReport);
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
});

module.exports = reports;
