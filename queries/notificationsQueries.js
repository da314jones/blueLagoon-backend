const db = require('../db/dbConfig');

const getAllNotifications = async () => {
    return db.any("SELECT * FROM notifications");
};

const getNotificationById = async (id) => {
    return db.one("SELECT * FROM notifications WHERE id = $1", id);
};

const createNotification = async (notification) => {
    return db.one(
        "INSERT INTO notifications (user_id, type, message, date) VALUES ($1, $2, $3, $4) RETURNING *",
        [notification.user_id, notification.type, notification.message, notification.date]
    );
};

module.exports = {
    getAllNotifications,
    getNotificationById,
    createNotification
};
