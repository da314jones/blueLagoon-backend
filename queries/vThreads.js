const db = require("../db/dbConfig.js");

const getAllVthreads = async () => {
  try {
    const allVthreads = await db.any("SELECT * FROM vthreads");
    console.log("Query results:", allVthreads);
    return allVthreads;
  } catch (err) {
    console.error("Error fetching all VTreads");
    return err;
  }
};

const getOneVthread = async (id) => {
  try {
    const oneVthread = await db.one("SELECT * FROM vthreads WHERE id=$1", id);
    return oneVthread;
  } catch (err) {
    return err;
  }
};

const createVthread = async (vthread) => {
  try {
    const createdVthread = await db.one(
      "INSERT INTO vthreads (user_id, video_url, title, category, creation_date) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [
        vthreads.user_id,
        vthreads.video_url,
        vthreads.title,
        vthreads.category,
        vthreads.creation_date,
      ]
    );
    return createdVthread;
  } catch (err) {
    return err;
  }
};

const deleteVthread = async (id) => {
  try {
    const deletedVthread = await db.one(
      "DELETE FROM vthreads WHERE id=$1 RETURNING *",
      id
    );
    return deletedVthread;
  } catch (err) {
    return err;
  }
};

const updateVthread = async (id, vthread) => {
  try {
    const { user_id, video_url, title, category, creation_date } = vthread;
    const updatedVthread = await db.one(
      "UPDATE vthreads SET user_id=$1, video_url=$2, title=$3, category=$4, creation_date=$5 WHERE id=$6 RETURNING *",
      [user_id, video_url, title, category, creation_date, id]
    );
    return updatedVthread;
  } catch (err) {
    console.error('Error updatingVChat:', err);
    return err;
  }
};

module.exports = {
  getAllVthreads,
  getOneVthread,
  createVthread,
  deleteVthread,
  updateVthread,
};
