const express = require('express');
const userGroups = express.Router();
const {
  getAllUserGroups,
  getUserGroupById,
  createUserGroup
} = require('../queries/userGroupsQueries');
const { userGroupsValidationSchema } = require('../validations/checkUserGroups');

userGroups.get('/', async (req, res) => {
    const allUserGroups = await getAllUserGroups();
    res.json(allUserGroups);
});

userGroups.get('/:id', async (req, res) => {
    const userGroup = await getUserGroupById(req.params.id);
    res.json(userGroup);
});

userGroups.post('/', async (req, res) => {
    const validation = userGroupsValidationSchema.validate(req.body);
    const newUserGroup = await createUserGroup(req.body);
    res.status(201).json(newUserGroup);
});

module.exports = userGroups;
