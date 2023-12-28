const OpenTok = require('opentok');
require('dotenv').config();

const apiKey = process.env.OPENTOK_API_KEY;
const apiSecret = process.env.OPENTOK_API_SECRET;
const openTok = new OpenTok(apiKey, apiSecret);


const createSessionAsync = () => {
    return new Promise((resolve, reject) => {
        openTok.createSession({ mediaMode: 'routed' }, (error, session) => {
            if (error) {
                reject(error);
            } else {
                resolve(session.sessionId);
            }
        });
    });
};

const generateToken = (sessionId) => {
    return openTok.generateToken(sessionId, {
        role: 'publisher',
        expireTime: (new Date().getTime() / 1000) + (7 * 24 * 60 * 60),
    });
};



module.exports = {
    createSessionAsync,
    generateToken
}