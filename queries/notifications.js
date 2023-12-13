const db = require('../db/dbConfig.js');

const getAllNotifications = async () => {
    try {
        console.log("Executing query fetch for notifications");
        const allNotifications = await db.any("SELECT * FROM notifications");
        console.log("Query request:", allNotifications)
        return allNotifications
    } catch(err) {
        console.error("Failed fetch all Professional VChat")
        return err
    }
};

const getOneNotification = async (id) => {
    try {
        const oneNotifications = await db.one("SELECT * FROM notifications WHERE id=$1", id);
        return oneNotifications;
    } catch(err) {
        return err
    }
};

const createNotification = async (notifications) => {
    try {
    const createdNotifications = await dn.one("INSERT INTO notifications (user_id, type, message, date) VALUES ($1, $2, $3, $4) RETURNING *", [user_id, type, message, date]);
    return createdNotifications;
    } catch(err) {
        return err
    }
};

const deleteNotification = async (id) => {
    try {
        const deletedNotifications = await db.one("DELETE FROM notifications WHERE id=$1 RETURNING *", id);
        return deletedNotifications;
    } catch(err) {
        return err
    }
};

const updateNotifications = async (id , notifications) => {
    try {
        const { user_id, type, message, date } = notifications;
        const updatedNotifications = await db.one("UPDATE notifications SET user_id=$1, type=$2, message=$3, date=$4 WHERE id=$5 RETURNING *", [user_id, type, message, date, id]);
        return updatedNotifications;
    } catch(err) {
        return err
    }
};


module.exports = {
    getAllNotifications,
    getOneNotification,
    createNotification,
    deleteNotification,
    updateNotifications
}