// passwordResetController.js

const express = require('express');
const passwordReset = express.Router();
const { resetPassword } = require('../queries/passwordResetQueries');
const { passwordResetValidationSchema } = require('../validations/checkPassword');

// Define routes for password reset
passwordReset.post('/reset', async (req, res) => {
    try {
        const validation = passwordResetValidationSchema.validate(req.body);
        // Generate a new password hash (you'll need to implement this)
        const newPasswordHash = generateNewPasswordHash(req.body.newPassword);
        await resetPassword(req.body.user_id, newPasswordHash);
        res.status(200).json({ message: 'Password reset successful' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = passwordReset;
