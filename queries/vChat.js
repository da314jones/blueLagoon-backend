const db = require('../db/dbConfig');

const getAllVChats = async () => {
  try {
    const allVchats = await db.any("SELECT * FROM vchat");
    console.log("Query results:", allVchats);
    return allVchats;
  } catch(err) {
    console.error('Error fetching all VChats')
    return err
  }
};

const getOneVChat = async (id) => {
  try {
    const oneVChat = await db.one("SELECT * FROM vchat WHERE id = $1", id);
    return oneVChat;
  } catch(err) {
    return err
  }
};

const createVChat = async (vchat) => {
  try {
    const createdVchat = await db.one("INSERT INTO vchat (user_id, video_url, schedule_time, duration, archive_link, start_time, end_time, archive_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *", [vchat.user_id, vchat.video_url, vchat.schedule_time, vchat.duration, vchat.archive_link, vchat.start_time, vchat.end_time, vchat.archive_url]);
    return createdVchat;
  } catch(err) {
    return err
  }
  };
  
  const deleteVChat = async (id) => {
  try {
    const deletedVchat = await db.one("DELETE FROM vchat WHERE id = $1 RETURNING *", id);
    return deletedVchat;
  } catch(err) {
    return err
  }
};

const updateVChat = async (id, vchat) => {
  try {
    const { user_id, video_url, schedule_time, duration, archive_link, start_time, end_time, archive_url } = vchat;
    const updatedVchat = await db.one("UPDATE vchat SET user_id = $1, video_url = $2, schedule_time = $3, duration = $4, archive_link = $5, start_time = $6, end_time = $7, archive_url = $8 WHERE id = $9 RETURNING *", [user_id, video_url, schedule_time, duration, archive_link, start_time, end_time, archive_url, id]);
    return updatedVchat;
  } catch(err) {
    console.error('Error updatingVChat:', err);
    throw err
  }
};

module.exports = {
    getAllVChats,
    getOneVChat,
    createVChat,
    deleteVChat,
    updateVChat
};
