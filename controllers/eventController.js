const express = require("express");
const events = express.Router();
const { eventValidationSchema } = require("../validations/checkevents.js");
const {
  getAllEvents,
  getOneEvent,
  createEvent,
  deleteEvent,
  updateEvent,
} = require("../queries/events.js");

events.get("/", async (req, res) => {
  console.log("Get event endpoint hit");
  try {
    const allEvents = await getAllEvents();
    console.log("Response from getAllEvents:", allEvents);
    if (allEvents[0]) {
      res.status(200).json({ success: true, payload: allEvents }); // Wrap response in a 'payload' object
    } else {
      res
        .status(500)
        .json({
          success: false,
          data: { error: "Server Error failed to fetch events" },
        });
    }
  } catch (err) {
    console.error("Error in GET /events:", err);
    res
      .status(500)
      .json({
        success: false,
        data: { error: "Server Error - events fetch failed" },
      });
  }
});

events.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const oneEvent = await getOneEvent(id);
    if (oneEvent) {
      res.json(oneEvent);
    } else {
      res.status(404).json({ error: "event not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Sever error" });
  }
});

events.post("/", async (req, res) => {
  try {
    const createdEvent = await createEvent(req.body);
    res.status(201).json(createdEvent);
  } catch (error) {
    res.status(400).json({ error: "event creation failure" });
  }
});

events.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEvent = await deleteEvent(id);
    if (deletedEvent) {
      res.status(200).json({ success: true, payload: { data: deletedEvent } });
    } else {
      res.status(404).json({ error: "event not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

events.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updatedEvent = await updateEvent(id, req.body);
    res.status(200).json(updatedEvent);
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
});

module.exports = events;
