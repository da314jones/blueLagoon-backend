const app = require("./app.js");
const OpenTok = require('opentok');

require("dotenv").config()
const PORT = process.env.PORT||7777

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})