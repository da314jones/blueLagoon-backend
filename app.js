const express = require("express");
const db = require('./db/dbConfig.js');
require('dotenv').config();
const affiliatesController = require('./controllers/affiliatesController.js');

const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use("/affiliates", affiliatesController);


app.get("/", (req, res) => {
  res.send("Welcome to DADS!")
})

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).send('Internal Server Error');
});

app.get("*", (req, res) => {
  console.error('Error in GET /affiliates:', err);
    res.status(404).send("Page not found")
})

module.exports = app