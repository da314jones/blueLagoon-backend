const db = require('../db/dbConfig');

const getAllVChats = async () => {
    return db.any("SELECT * FROM vchats");
};

const getVChatById = async (id) => {
    return db.one("SELECT * FROM vchats WHERE session_id = $1", id);
};

const createVChat = async (vchat) => {
    return db.one(
        "INSERT INTO vchats (host_user_id, video_url, schedule_time, duration, archive_link, start_time, end_time, archive_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
        [vchat.host_user_id, vchat.video_url, vchat.schedule_time, vchat.duration, vchat.archive_link, vchat.start_time, vchat.end_time, vchat.archive_url]
    );
};

const updateVChat = async (id, vchat) => {
    return db.one(
        "UPDATE vchats SET host_user_id=$1, video_url=$2, schedule_time=$3, duration=$4, archive_link=$5, start_time=$6, end_time=$7, archive_url=$8 WHERE session_id=$9 RETURNING *",
        [vchat.host_user_id, vchat.video_url, vchat.schedule_time, vchat.duration, vchat.archive_link, vchat.start_time, vchat.end_time, vchat.archive_url, id]
    );
};

const deleteVChat = async (id) => {
    return db.one("DELETE FROM vchats WHERE session_id=$1 RETURNING *", id);
};

module.exports = {
    getAllVChats,
    getVChatById,
    createVChat,
    updateVChat,
    deleteVChat
};
