const express = require('express');
const notifications = express.Router();
const { notificationsValidationSchema } = require('../validations/checkNotifications');
const {
    getAllNotifications,
    getNotificationById,
    createNotification
} = require('../queries/notificationsQueries');

notifications.get('/', async (req, res) => {
    try {
        const allNotifications = await getAllNotifications();
        res.json(allNotifications);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

notifications.get('/:id', async (req, res) => {
    try {
        const notification = await getNotificationById(req.params.id);
        if (notification) {
            res.json(notification);
        } else {
            res.status(404).send('Notification not found');
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

notifications.post('/', async (req, res) => {
    try {
        const validation = notificationsValidationSchema.validate(req.body);
        if (validation.error) {
            return res.status(400).json({ error: validation.error.details[0].message });
        }
        const newNotification = await createNotification(req.body);
        res.status(201).json(newNotification);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = notifications;
