const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { usersValidationSchema } = require('../validations/checkUsers');
const {
    getAllUsers,
    getUserById,
    createUser,
    getUserByUsernameOrEmail
} = require('../queries/usersQueries');

const users = express.Router();

// Generate JWT Token
const generateToken = (user) => {
    return jwt.sign({ user_id: user.user_id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
};
// Register new user
users.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const validation = usersValidationSchema.validate(req.body);
        if (validation.error) {
            return res.status(400).json({ message: validation.error.details[0].message });
        }

        const existingUser = await getUserByUsernameOrEmail(username, email);
        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await createUser({ ...req.body, password_hash: hashedPassword });

        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Error registering new user', error: error.message });
    }
});

// User login
users.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await getUserByUsernameOrEmail(username, username);

        if (user && await bcrypt.compare(password, user.password_hash)) {
            const token = generateToken(user);
            res.json({ message: 'Login successful', token, user });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
});

// Get all users
users.get('/', async (req, res) => {
    try {
        const users = await getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
});

// Get user by ID
users.get('/:user_id', async (req, res) => {
    try {
        const user = await getUserById(req.params.user_id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error: error.message });
    }
});

module.exports = users;
