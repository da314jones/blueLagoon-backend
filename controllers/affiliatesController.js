const express = require("express");
const affiliates = express.Router();
// const { affiliatesValidationSchema } = require("../validations/checkAffiliates.js");

const {
  getAllAffiliates,
  getOneAffiliate,
  createAffiliate,
  deleteAffiliate,
  updateAffiliate,
} = require("../queries/affiliates.js");

affiliates.get("/", async (req, res) => {
    console.log('GET /affiliates endpoint hit');
    try {
        const allAffiliates = await getAllAffiliates();
        console.log('Response from getAllAffiliates:', allAffiliates);
        if (allAffiliates[0]) {
            res.status(200).json({ success: true, data: { payload: allAffiliates } });
        } else {
            res.status(500).json({ success: false, data: { error: "Server Error - affiliates fetch failed" } });
        }
    } catch (err) {
        console.error('Error in GET /affiliates:', err);
        res.status(500).json({ success: false, data: { error: "Server Error - affiliates fetch failed" } });
    }
});


affiliates.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const oneAffiliate = await getOneAffiliate(id);
    if (oneAffiliate) {
      res.json(oneAffiliate);
    } else {
      res.status(404).json({
        error: "not found!",
      });
    }
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

affiliates.post("/", validateAffiliate, async (req, res) => {
  try {
    const createdAffiliate = await createAffiliate(req.body);
    res.json(createdAffiliate);
  } catch (error) {
    res.status(400).json({ error: "Affiliate creation failure" });
  }
});

affiliates.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAffiliate = await deleteAffiliate(id);
    if (deletedAffiliate) {
      res.status(200).json({ success: true, payload: { data: deletedAffiliate } });
    } else {
      res.status(404).json({ error: "Affiliate not found!" });
    }
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

affiliates.put("/:id", validateAffiliate, async (req, res) => {
  const { id } = req.params;
  try {
      const updatedAffiliate = await updateAffiliate(id, req.body);
      if (updatedAffiliate.id) {
          res.status(200).json(updatedAffiliate);
        } else {
            res.status(404).json("no affiliate found with that id");
        }
  } catch (error) {
    res.status(500).json({ error: "Update failed" });
  }
});

function validateAffiliate(req, res, next) {
    const { error } = affiliateValidationSchema.validate(req.body);
    if (error) {
        res.status(400).json({ error: error.details[0].message });
    } else {
        next();
    }
}

module.exports = affiliates;
