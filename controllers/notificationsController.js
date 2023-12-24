const express = require("express");
const notifications = express.Router();
const { notificationsValidationSchema } = require("../validations/checkNotifications.js");
const {
  getAllNotifications,
  getOneNotification,
  createNotification,
  deleteNotification,
  updateNotifications
} = require("../queries/notifications.js");

notifications.get("/", async (req, res) => {
  console.log("Get notification endpoint hit");
  try {
    const allNotifications = await getAllNotifications();
    console.log("Response from getAllNotifications:", allNotifications);
    if (allNotifications[0]) {
      res.status(200).json({ success: true, payload: allNotifications }); // Wrap response in a 'payload' object
    } else {
      res
        .status(500)
        .json({
          success: false,
          data: { error: "Server Error failed to fetch notifications" },
        });
    }
  } catch (err) {
    console.error("Error in GET /notifications:", err);
    res
      .status(500)
      .json({
        success: false,
        data: { error: "Server Error - notifications fetch failed" },
      });
  }
});

notifications.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const oneNotification = await getOneNotification(id);
    if (oneNotification) {
      res.json(oneNotification);
    } else {
      res.status(404).json({ error: "notification not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Sever error" });
  }
});

notifications.post("/", async (req, res) => {
  const { error } = notificationValidationSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const createdNotification = await createNotification(req.body);
    res.status(201).json(createdNotification);
  } catch (error) {
    res.status(400).json({ error: "notification creation failure" });
  }
});

notifications.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedNotification = await deleteNotification(id);
    if (deletedNotification) {
      res.status(200).json({ success: true, payload: { data: deletedNotification } });
    } else {
      res.status(404).json({ error: "notification not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

notifications.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
        const updatedNotification = await updateNotifications(id, req.body);
    res.status(200).json(updatedNotification);
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
});

module.exports = notifications;
