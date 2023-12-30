// sessionIDGenerator.js

const OpenTok = require('opentok');
require('dotenv').config();

// Initialize OpenTok
const apiKey = process.env.OPENTOK_API_KEY;
const apiSecret = process.env.OPENTOK_API_SECRET;
const opentok = new OpenTok(apiKey, apiSecret);

// Function to generate a dynamic session ID
const generateSessionId = () => {
  return new Promise((resolve, reject) => {
    opentok.createSession({ mediaMode: 'routed' }, (error, session) => {
      if (error) {
        console.error('Error creating session:', error);
        reject(error);
      } else {
        console.log(`Generated Session ID: ${session.sessionId}`);
        resolve(session.sessionId);
      }
    });
  });
};

module.exports = generateSessionId;
