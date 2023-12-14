const db = require('../db/dbConfig.js');

// Retrieve all mentorships
const getAllMentorships = async () => {
    try {
        const allMentorships = await db.any('SELECT * FROM mentorships');
        return allMentorships;
    } catch (err) {
        console.error("Failed fetch all Professional VChat")
        return err;
    }
};

// Retrieve a single mentorship by id
const getOneMentorship = async (id) => {
    try {
        const oneMentorship = await db.one('SELECT * FROM mentorships WHERE id = $1', id);
        return oneMentorship;
    } catch (err) {
        return err;
    }
};

// Create a new mentorship
const createMentorship = async (mentorship) => {
    try {
        const newMentorship = await db.one(
            'INSERT INTO mentorships (mentor_id, mentee_id, start_date, end_date, status, notes) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [mentorship.mentor_id, mentorship.mentee_id, mentorship.start_date, mentorship.end_date, mentorship.status, mentorship.notes]
        );
        return newMentorship;
    } catch (err) {
        return err;
    }
};

// Delete a mentorship
const deleteMentorship = async (id) => {
    try {
        const deletedMentorship = await db.result('DELETE FROM mentorships WHERE id=$1', id);
        return deletedMentorship;
    } catch (err) {
        return err;
    }
};

// Update a mentorship
const updateMentorship = async (id, mentorship) => {
    try {
        const { mentor_id, mentee_id, start_date, end_date, status, notes } = mentorship;
        const updatedMentorship = await db.one(
            'UPDATE mentorships SET mentor_id=$1, mentee_id=$2, start_date=$3, end_date=$4, status=$5, notes=$6, WHERE id=$7, RETURNING *',
            [mentor_id, mentee_id, start_date, end_date, status, notes, id]
        );
        return updatedMentorship;
    } catch (err) {
        return err;
    }
};

module.exports = {
    getAllMentorships,
    getOneMentorship,
    createMentorship,
    deleteMentorship,
    updateMentorship
};
