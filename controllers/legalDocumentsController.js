const express = require("express");
const legalDocuments = express.Router();
const { LegalDocumentValidationSchema } = require("../validations/checkLegalDocuments.js");
const {
  getAllLegalDocuments,
  getOneLegalDocument,
  createLegalDocument,
  deleteLegalDocument,
  updateLegalDocument,
} = require("../queries/legalDocuments.js");

legalDocuments.get("/", async (req, res) => {
  console.log("Get LegalDocument endpoint hit");
  try {
    const allLegalDocuments = await getAllLegalDocuments();
    console.log("Response from getAllLegalDocuments:", allLegalDocuments);
    if (allLegalDocuments[0]) {
      res.status(200).json({ success: true, payload: allLegalDocuments }); // Wrap response in a 'payload' object
    } else {
      res
        .status(500)
        .json({
          success: false,
          data: { error: "Server Error failed to fetch legalDocuments" },
        });
    }
  } catch (err) {
    console.error("Error in GET /legalDocuments:", err);
    res
      .status(500)
      .json({
        success: false,
        data: { error: "Server Error - legalDocuments fetch failed" },
      });
  }
});

legalDocuments.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const OneLegalDocument = await getOneLegalDocument(id);
    if (OneLegalDocument) {
      res.json(OneLegalDocument);
    } else {
      res.status(404).json({ error: "LegalDocument not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Sever error" });
  }
});

legalDocuments.post("/", async (req, res) => {
  try {
    const createdLegalDocument = await createLegalDocument(req.body);
    res.status(201).json(createdLegalDocument);
  } catch (error) {
    res.status(400).json({ error: "LegalDocument creation failure" });
  }
});

legalDocuments.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedLegalDocument = await deleteLegalDocument(id);
    if (deletedLegalDocument) {
      res.status(200).json({ success: true, payload: { data: deletedLegalDocument } });
    } else {
      res.status(404).json({ error: "LegalDocument not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

legalDocuments.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (!updateLegalDocument) {
      return res.status(404).json({ error: "LegalDocument not found with that id" });
    }
    const updatedLegalDocument = await updateLegalDocument(id, req.body);
    res.status(200).json(updatedLegalDocument);
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
});

module.exports = legalDocuments;
