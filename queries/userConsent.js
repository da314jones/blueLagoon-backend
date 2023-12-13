const db = require('../db/dbConfig.js');

const getAllUserConsents = async () => {
    try {
        console.log("Executing query to fetch all user consent");
        const allUserConsentLogs = await db.any("SELECT * FROM user-consent_logs");
        console.log("Query results:", allUserConsentLogs);
        return allUserConsentLogs;
    } catch(err) {
        return err
    }
};

const getOneUserConsent = async (id) => {
    try {
        const oneUserConsentLog = await  db.one("SELECT * FROM user_consent_logs");
        return oneUserConsentLog
    } catch(err) {
        return err
    }
};

const createUserConsent = async (userConsent) => {
    try {
        const createdUserConsent = await db.one("INSERT INTO user_consent_logs (user_id, document_id, consent_id, version) VALUES ($1, $2, $3, $4)RETURNING *" [userConsent.user_id, userConsent.document_id, userConsent.consent_date, userConsent.version]);
        return createdUserConsent;
    } catch(err) {
        return err
    }
};


module.exports = {
    getAllUserConsents,
    getOneUserConsent,
    createUserConsent
}