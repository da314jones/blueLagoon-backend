const express = require('express');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer"); // Add nodemailer for sending reset emails
const users = express.Router();
const { usersValidationSchema } = require('../validations/checkUsers');
const {
    getAllUsers,
    getUserById,
    createUser,
    getUserByUsernameOrEmail, // Add this import to check if username or email exists
    generateResetToken, // Add this import to generate reset tokens
} = require('../queries/usersQueries');

// User data (for the admin/creator)
const adminUser = {
    username: "alphaOmega",
    email: "jonesda314@outlook.com",
    password: "hashed_PlatinumBella13*", // Replace with the actual hashed password
    date_of_birth: "1975-03-14",
    is_age_verified: true,
    account_status: "active",
    phone_number: "1234567890",
    profile_pic: "profile_pic_url",
    interests: "Father of 2, Male",
    challenges: "Single parenting",
    experiences: "Experienced father, Brooklyn resident",
    locations: "Brooklyn, NY",
    join_date: "2021-01-01",
    role: "admin",
    last_login: "2023-01-01 09:00:00",
};

// Send password reset email
const sendResetEmail = async (email, resetToken) => {
    try {
        // Create a nodemailer transporter (configure with your email service)
        const transporter = nodemailer.createTransport({
            service: "YourEmailService",
            auth: {
                user: "YourEmailAddress",
                pass: "YourEmailPassword",
            },
        });

        // Define email content
        const mailOptions = {
            from: "YourEmailAddress",
            to: email,
            subject: "Password Reset",
            text: `Click the following link to reset your password: ${resetToken}`,
        };

        // Send the email
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error("Email sending error:", error);
    }
};

users.get('/', async (req, res) => {
    const allUsers = await getAllUsers();
    res.json(allUsers);
});

users.get('/:user_id', async (req, res) => {
    const user = await getUserById(req.params.user_id);
    res.json(user);
});

users.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Verify the username and password
    if (username === adminUser.username && await bcrypt.compare(password, adminUser.password)) {
        // Assuming the user is authenticated successfully
        const token = jwt.sign({ username: adminUser.username, role: adminUser.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
        // Send the token in the response
        return res.json({ token });
    }

    // Authentication failed
    res.status(401).json({ message: "Authentication failed" });
});

users.post('/register', async (req, res) => {
    try {
        const userData = req.body;

        // Check if the username or email is already taken
        const existingUser = await getUserByUsernameOrEmail(userData.username, userData.email);

        if (existingUser) {
            return res.status(400).json({ message: "Username or email already exists" });
        }

        // Hash the user's password
        const hashedPassword = await bcrypt.hash(userData.password, 10);

        // Create the new user
        const newUser = {
            username: userData.username,
            email: userData.email,
            password: hashedPassword,
            // Add other user properties as needed
        };

        // Insert the new user into the database
        const createdUser = await createUser(newUser);

        // Assuming the user is authenticated successfully
        const token = jwt.sign({ username: createdUser.username, role: createdUser.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

        // Send the token and user data in the response
        res.json({ token, user: createdUser });
    } catch (error) {
        console.error("User registration error:", error);
        res.status(500).json({ message: "Registration failed" });
    }
});

users.post('/reset-password', async (req, res) => {
    try {
        const { email } = req.body;

        // Check if the email exists in the database
        const user = await getUserByUsernameOrEmail(null, email);

        if (!user) {
            return res.status(404).json({ message: "Email not found" });
        }

        // Generate a reset token and update the user's record
        const resetToken = generateResetToken(user.user_id);

        // Send a password reset email with the resetToken
        sendResetEmail(email, resetToken);

        res.json({ message: "Password reset email sent" });
    } catch (error) {
        console.error("Password reset error:", error);
        res.status(500).json({ message: "Password reset failed" });
    }
});

module.exports = users;
