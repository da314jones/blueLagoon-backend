const db = require('../db/dbConfig.js');

const getAllUserConsentLogs = async () => {
    try {
        console.log("Executing query to fetch all user consent");
        const allUserConsentLogs = await db.any("SELECT * FROM user-consent_logs");
        console.log("Query results:", allUserConsentLogs);
        return allUserConsentLogs;
    } catch(err) {
        console.error("Failed fetch all Professional VChat")
        return err
    }
};

const getOneUserConsentLog = async (id) => {
    try {
        const oneUserConsentLog = await  db.one("SELECT * FROM user_consent_logs WHERE id=$1", id);
        return oneUserConsentLog
    } catch(err) {
        return err
    }
};

const createUserConsentLog = async (id, userConsent) => {
    try {
        const createdUserConsent = await db.one("INSERT INTO user_consent_logs (user_id, document_id, consent_id, version) VALUES ($1, $2, $3, $4)RETURNING *" [userConsent.user_id, userConsent.document_id, userConsent.consent_date, userConsent.version, id]);
        return createdUserConsent;
    } catch(err) {
        return err
    }
};


module.exports = {
    getAllUserConsentLogs,
    getOneUserConsentLog,
    createUserConsentLog
}