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
const chatMessagesController = require('./controllers/chatMessagesController.js')
const connectionsController = require("./controllers/connectionsController.js");
const consentLogsController = require("./controllers/consentLogsController.js");
const emergencyContactsController = require('./controllers/emergencyContactsController.js');
const errorLogsController = require('./controllers/errorLogsController.js');
const eventsController = require('./controllers/eventsController.js');
const groupsController = require('./controllers/groupsController.js');
const legalDocumentsController = require('./controllers/legalDocumentsController.js');
const mentorshipsController = require('./controllers/mentorshipsControllers.js');
const notificationsController = require('./controllers/notificationsController.js');
const professionalVchatsController = require('./controllers/professionalVchatsController.js');
const professionalVthreadsController = require('./controllers/professionalVthreadsController.js');
const profilesController = require("./controllers/profilesController.js");
const recommendationsController = require("./controllers/recommendationsController.js");
const registrationsController = require("./controllers/registrationsController.js");
const resourcesController = require("./controllers/resourcesController.js");
const reportsController = require('./controllers/reportsControllers.js')
const reviewsController = require('./controllers/reviewsControllers.js')
const  securityController = require('./controllers/securityController.js');
const socialMediaAccountsController = require("./controllers/socialMediaAccountsController.js");
const  userGroupsController = require('./controllers/userGroupsController.js');
const  usersController = require('./controllers/usersController.js');
const  vChatsController = require('./controllers/vChatsController.js');
const  vThreadsController = require('./controllers/vThreadsController.js');
// Define routes for user-related functionality
// app.use("/users", usersController);
// Define route for affiliate functionality
// app.use("/affiliate", affiliateController);
app.use("/affiliates", affiliatesController);
app.use("/chatMessages", chatMessagesController)
app.use("/connections", connectionsController)
app.use("/consentLogs", consentLogsController);
app.use("/emergencycontacts", emergencyContactsController);
app.use("/errorLogs", errorLogsController);
app.use("/events", eventsController);
app.use("/groups", groupsController);
app.use("/legalDocuments", legalDocumentsController);
app.use("/mentorships", mentorshipsController);
app.use("/notifications", notificationsController);
app.use("/professionalVchats", professionalVchatsController);
app.use("/professionalVthreads", professionalVthreadsController);
app.use("/profiles", profilesController)
app.use("/recommendations", recommendationsController)
app.use("/registrations", registrationsController)
app.use("/resources", resourcesController);
app.use("/reports", reportsController)
app.use("/reviews", reviewsController)
app.use("/security", securityController);
app.use("/socialMediaAccounts", socialMediaAccountsController)
app.use("/userGroups", userGroupsController)
app.use("/users", usersController);
app.use("/vchats", vChatsController)
app.use("/vthreads", vThreadsController);
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
