const cors = require("cors");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("./db/dbConfig");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.send("Welcome to DADS!")
})

// Import affiliate controller (existing route)
// const affiliateController = require("./controllers/affiliatesController.js");
//  Import user-related controller
// const usersController = require("./controllers/usersController.js");
const  affiliatesController = require('./controllers/affiliatesController.js');
const emergencyContactsController = require('./controllers/emergencyContactsController.js');
const eventsController = require('./controllers/eventController.js');
const groupsController = require('./controllers/groupsController.js');
const legalDocumentsController = require('./controllers/legalDocumentsController.js');
const mentorshipsController = require('./controllers/mentorshipsControllers.js');
const notificationsController = require('./controllers/notificationsController.js');
const  vchatsController = require('./controllers/vChatsController.js');
const profilesController = require("./controllers/usersProfilesController.js");
const  vThreadsController = require('./controllers/vThreadsController.js');
const  userSecurityController = require('./controllers/userSecurityController.js');
const  usersController = require('./controllers/usersController.js');
const events = require("./controllers/eventController.js");
// Define routes for user-related functionality

// app.use("/users", usersController);

// Define route for affiliate functionality
// app.use("/affiliate", affiliateController);
app.use("/affiliates", affiliatesController);
app.use("/emergencycontacts", emergencyContactsController);
app.use("/events", eventsController);
app.use("/groups", groupsController);
app.use("/legalDocuments", legalDocumentsController);
app.use("/mentorships", mentorshipsController);
app.use("/notificiations", notificationsController);
app.use("/vchats", vchatsController);
app.use("/profiles", profilesController)
app.use("/vthreads", vThreadsController);
app.use("/security", userSecurityController);
app.use("/users", usersController);
// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

// 404 Not Found Middleware
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

module.exports = app;
