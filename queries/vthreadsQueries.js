const db = require('../db/dbConfig');

const getAllVThreads = async () => {
    try {
        return await db.any("SELECT * FROM vthreads");
    } catch (err) {
        console.error("Error fetching all VThreads:", err);
        throw err;
    }
};

const getOneVThread = async (id) => {
    try {
        return await db.one("SELECT * FROM vthreads WHERE thread_id = $1", id);
    } catch (err) {
        console.error(`Error fetching VThread with ID ${id}:`, err);
        throw err;
    }
};

const createVThread = async (vthread) => {
    const { host_user_id, title, description, video_url, duration } = vthread;
    try {
        return await db.one(
            "INSERT INTO vthreads (host_user_id, title, description, video_url, duration, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING *",
            [host_user_id, title, description, video_url, duration]
        );
    } catch (err) {
        console.error('Error creating VThread:', err);
        throw err;
    }
};

const deleteVThread = async (id) => {
    try {
        return await db.one("DELETE FROM vthreads WHERE thread_id = $1 RETURNING *", id);
    } catch (err) {
        console.error(`Error deleting VThread with ID ${id}:`, err);
        throw err;
    }
};

const updateVThread = async (id, vthread) => {
    const { title, description, video_url, duration } = vthread;
    try {
        return await db.one(
            "UPDATE vthreads SET title = $1, description = $2, video_url = $3, duration = $4, updated_at = CURRENT_TIMESTAMP WHERE thread_id = $5 RETURNING *",
            [title, description, video_url, duration, id]
        );
    } catch (err) {
        console.error(`Error updating VThread with ID ${id}:`, err);
        throw err;
    }
};

module.exports = {
    getAllVThreads,
    getOneVThread,
    createVThread,
    deleteVThread,
    updateVThread
};
