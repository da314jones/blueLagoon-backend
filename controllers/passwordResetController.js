const express = require('express');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { resetPassword, getUserByEmail } = require('../queries/passwordResetQueries'); // Adjust the path as needed
require('dotenv').config();

const passwordReset = express.Router();

// Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    }
});

// Send reset email
const sendResetEmail = async (email, resetToken) => {
    const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: email,
        subject: 'Password Reset',
        text: `Your password reset token is: ${resetToken}`
    };

    await transporter.sendMail(mailOptions);
};

// Generate reset token
const generateResetToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Request password reset
passwordReset.post('/request-reset', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Use TEST_TOKEN from .env if it exists, else generate a new one
        const resetToken = process.env.TEST_TOKEN || generateResetToken(user.user_id);
        
        await sendResetEmail(email, resetToken);
        res.status(200).json({ message: 'Password reset email sent' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Reset the password
passwordReset.post('/reset', async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const newPasswordHash = await bcrypt.hash(newPassword, 10);
        await resetPassword(decoded.userId, newPasswordHash);
        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = passwordReset;
