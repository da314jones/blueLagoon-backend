const db = require('../db/dbConfig.js');

const getAllSocialMediaAccounts = async () => {
    try {
        console.log("Executing query fetching all");
        const all = await db.any("SELECT * FROM");
        console.log("Query results:", all);
        return all
    } catch(err) {
        console.error("Failed fetch all Professional VChat")
        return err
    }
};

const getOneSocialMediaAccount = async () => {
    try {

    } catch(err) {
        return err
    }
};

const createSocialMediaAccount = async () => {
    try {

    }  catch(err) {
        return err
    }
};

const deleteSocialMediaAccount = async () => {
    try {

    } catch(err) {
        return err
    }
};

const updateSocialMediaAccount = async () => {
    try {

    } catch(err) {
        return err
    }
};

module.exports = {
    getAllSocialMediaAccounts,
    getOneSocialMediaAccount,
    createSocialMediaAccount,
    deleteSocialMediaAccount,
    updateSocialMediaAccount
}