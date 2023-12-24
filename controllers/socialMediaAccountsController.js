const express = require("express");
const socialMediaAccounts = express.Router();
const { socialMediaAccountValidationSchema } = require("../validations/checkSocialMediaAccounts.js");
const {
  getAllSocialMediaAccounts,
  getOneSocialMediaAccount,
  createSocialMediaAccount,
  deleteSocialMediaAccount,
  updateSocialMediaAccount,
} = require("../queries/socialMediaAccounts.js");

socialMediaAccounts.get("/", async (req, res) => {
  console.log("Get socialMediaAccount endpoint hit");
  try {
    const allSocialMediaAccounts = await getAllSocialMediaAccounts();
    console.log("Response from getAllSocialMediaAccounts:", allSocialMediaAccounts);
    if (allSocialMediaAccounts[0]) {
      res.status(200).json({ success: true, payload: allSocialMediaAccounts }); // Wrap response in a 'payload' object
    } else {
      res
        .status(500)
        .json({
          success: false,
          data: { error: "Server Error failed to fetch socialMediaAccounts" },
        });
    }
  } catch (err) {
    console.error("Error in GET /socialMediaAccounts:", err);
    res
      .status(500)
      .json({
        success: false,
        data: { error: "Server Error - socialMediaAccounts fetch failed" },
      });
  }
});

socialMediaAccounts.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const oneSocialMediaAccount = await getOneSocialMediaAccount(id);
    if (oneSocialMediaAccount) {
      res.json(oneSocialMediaAccount);
    } else {
      res.status(404).json({ error: "socialMediaAccount not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Sever error" });
  }
});

socialMediaAccounts.post("/", async (req, res) => {
  const { error } = socialMediaAccountValidationSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const createdSocialMediaAccount = await createSocialMediaAccount(req.body);
    res.status(201).json(createdSocialMediaAccount);
  } catch (error) {
    res.status(400).json({ error: "socialMediaAccount creation failure" });
  }
});

socialMediaAccounts.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSocialMediaAccount = await deleteSocialMediaAccount(id);
    if (deletedSocialMediaAccount) {
      res.status(200).json({ success: true, payload: { data: deletedSocialMediaAccount } });
    } else {
      res.status(404).json({ error: "socialMediaAccount not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

socialMediaAccounts.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updatedSocialMediaAccount = await updateSocialMediaAccount(id, req.body);
    res.status(200).json(updatedSocialMediaAccount);
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
});

module.exports = socialMediaAccounts;
