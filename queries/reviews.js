const db = require('../db/dbConfig.js');

const getAllReviews = async () => {
    try {
console.log("Executing query fetch for all reviews");
const allReviews = await db.any("SELECT * FROM reviews")
console.log("Query results:", allReviews)
return allReviews;
    } catch(err) {
        console.error("Failed to fetch all reviews")
        return err
    }
};

const getOneReview = async (id) => {
    try {
        const oneReview = await db.one("SELECT * FROM reviews WHERE id=$1", id);
        return oneReview
    } catch(err) {
        return err
    }
};



const createReview = async (review) => {
    try {
        const createdReview = await db.one("INSERT INTO reviews (user_id,event_id, rating, comment, created_at) VALUES ($1, $2, $3, $4) RETURNING *", [review.user_id. review.event_id, review.rating, review.comment, review.created_at]);
        return createdReview
    } catch(err) {
        return err
    }
};

const deleteReview = async (id) => {
    try {
    const deletedReview = await db.one("DELETE FROM reviews WHERE id=$1 RETURNING *", id);
    return deletedReview
    } catch(err) {
        return err
    }
};

const updateReview = async (id, review) => {
    try {
        const { user_id, event_id, rating, comment, created_at } = review;
        const updatedReview = await db.one("UPDATE reviews SET user_id=$1, event_id=$2, rating= $3, comment=$4, created_at=$5, WHERE id=$6, RETURNING *", [user_id, event_id, rating, comment, created_at, id]);
        return updatedReview;
    } catch(err) {
        return err
    }
};


module.exports = {
    getAllReviews,
    getOneReview,
    createReview,
    deleteReview,
    updateReview
}