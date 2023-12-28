const OpenTok = require('opentok');
require('dotenv').config();

// Initialize OpenTok
const apiKey = process.env.OPENTOK_API_KEY;
const apiSecret = process.env.OPENTOK_API_SECRET;
const opentok = new OpenTok(apiKey, apiSecret);

// Function to create a single session
const createSession = () => {
  return new Promise((resolve, reject) => {
    opentok.createSession({ mediaMode: 'routed' }, (error, session) => {
      if (error) {
        console.error('Error creating session:', error);
        reject(error);
      } else {
        console.log(`Session ID: ${session.sessionId}`);
        resolve(session.sessionId);
      }
    });
  });
};

// Generating multiple session IDs
const generateSessions = async (numberOfSessions) => {
  let sessionIds = [];
  for (let i = 0; i < numberOfSessions; i++) {
    const sessionId = await createSession();
    console.log(`Session ID ${i + 1}: ${sessionId}`);
    sessionIds.push(sessionId);
  }
  return sessionIds;
};

// Replace 7 with the number of sessions you need
generateSessions(7).then(sessionIds => {
  console.log('Generated Session IDs:', sessionIds);
});
