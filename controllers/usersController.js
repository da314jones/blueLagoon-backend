const express = require('express');
const users = express.Router();
const { usersValidationSchema } = require('../validations/checkUsers');
const {
    getAllUsers,
    getUserById,
    createUser
} = require('../queries/usersQueries');

users.get('/', async (req, res) => {
    const allUsers = await getAllUsers();
    res.json(allUsers);
});

users.get('/:user_id', async (req, res) => {
    const user = await getUserById(req.params.user_id);
    res.json(user);
});

users.post('/', async (req, res) => {
    const validation = usersValidationSchema.validate(req.body);
    const newUser = await createUser(req.body);
    res.status(201).json(newUser);
});

module.exports = users;
