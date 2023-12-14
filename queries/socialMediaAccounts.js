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

const getOneSocialMediaAccount = async (id) => {
    try {
        const oneSocialMediaAccount =await db.one("SELECT * FROM social_media_accounts WHERE id=$1 RETURNING *");
        return oneSocialMediaAccount
    } catch(err) {
        return err
    }
};

const createSocialMediaAccount = async (socialMediaAccount) => {
    try {
        const createdOneSocialMediaAccount = await db.one("INSERT INTO social_media_accounts (user_id, social_media_platform, social_media_id, profile_url, connected_on) VALUES ($1, $2, $3, $4, $5) RETURNING *", [socialMediaAccount.user_id, socialMediaAccount.social_media_platform, socialMediaAccount.social_media_id, socialMediaAccount.profile_url, socialMediaAccount.connected_on])
    }  catch(err) {
        return err
    }
};

const deleteSocialMediaAccount = async (id) => {
    try {
        const deletedSocial_media_accounts = await db.one("DELETE FROM social_media_accounts WHERE id=$1 RETURNING *", id);
        return deleteSocialMediaAccount;
    } catch(err) {
        return err
    }
};

const updateSocialMediaAccount = async (id, socialMediaAccount) => {
    try {
        const { user_id, social_media_platform, social_media_id, profile_url, connected_on } = socialMediaAccount
        const updateSocialMediaAccount = await db.one("UPDATE social_media_accounts SET user_id=$1, social_media_accounts=$2, social_media_id=$3, profile_url=$4, connected_on= $5 WHERE id=$6 RETURNING *", [user_id, social_media_platform, social_media_id, profile_url, connected_on, id])
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