const db = require('../db/dbConfig.js');

const getAllRecommendations = async () => {
    try {
        console.log("Executing query fetch all recommendations");
        const allRecommendations = await db.any("SELECT * FROM recommendations")
        console.log("Query results:", allRecommendations);
        return allRecommendations
    } catch(err) {
        console.error("Failed fetch all Professional VChat")
        return err
    }
};

const getOneRecommendation = async (id) => {
    try {
        const oneRecommendation = await db.one("SELECT * FROM recommendations WHERE id=$1 RETURNING *", id);
        return oneRecommendation
    } catch(err) {
        return err
    }
};

const createRecommendation = async (recommendation) => {
    try {
        const createdRecommendation = await db.one("INSERT INTO recommendations (user_id, title, link, recommended_on) VALUES ($1, $2, $3, $4) RETURNING *" [recommendation.user_id, recommendation.title, recommendation.link, recommendation.recommended_on]);
        return createdRecommendation;
    } catch(err) {
        return err
    }
};

const deleteRecommendations = async (id) => {
    try {
        const deletedRecommendation = await db.one("DELETE FROM recommendations WHERE ID=$1 RETURNING *", id);
        return deletedRecommendation;
    } catch(err) {
        return err
    }
};

const updateRecommendations = async (id, recommendation) => {
    try {
        const { user_id, title, link, recommended_on } = recommendation;
        const updatedRecommendation = await db.one("UPDATE recommendations SET user_id=$1, title=$2, link=$3, recommended_on=$4 WHERE id=$5 RETURNING *", [user_id, title, link, recommended_on, id]);
        return updatedRecommendation
    } catch(err) {
        return err
    }
};


module.exports = {
    getAllRecommendations,
    getOneRecommendation,
    createRecommendation,
    deleteRecommendations,
    updateRecommendations
}