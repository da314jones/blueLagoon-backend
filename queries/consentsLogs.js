const db = require('../db/dbConfig.js');

const getAllConsentLogs = async () => {
    try {
        console.log("Executing query to fetch all Consent Logs");
        const allConsentLogs = await db.any("SELECT * FROM consent_logs");
        console.log("Query results:", allConsentLogs);
        return allConsentLogs;
    } catch(err) {
        console.error("Failed fetch all Consent Logs")
        return err
    }
};

const getOneConsentLog = async (id) => {
    try {
        const oneConsentLog = await  db.one("SELECT * FROM consent_logs WHERE id=$1", id);
        return oneConsentLog
    } catch(err) {
        return err
    }
};

const createConsentLog = async (id, userConsent) => {
    try {
        const createdConsent = await db.one("INSERT INTO consent_logs (user_id, document_id, consent_id, version) VALUES ($1, $2, $3, $4)RETURNING *" [userConsent.user_id, userConsent.document_id, userConsent.consent_date, userConsent.version, id]);
        return createdConsent;
    } catch(err) {
        return err
    }
};


module.exports = {
    getAllConsentLogs,
    getOneConsentLog,
    createConsentLog
}