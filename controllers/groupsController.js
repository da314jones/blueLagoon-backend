const express = require('express');
const groups = express.Router();
const {
  getAllGroups,
  getGroupById,
  createGroup,
  updateGroup,
  deleteGroup
} = require('../queries/groupsQueries');
const { groupsValidationSchema } = require('../validations/checkGroups');

groups.get('/', async (req, res) => {
    const allGroups = await getAllGroups();
    res.json(allGroups);
});

groups.get('/:id', async (req, res) => {
    const group = await getGroupById(req.params.id);
    res.json(group);
});

groups.post('/', async (req, res) => {
    const validation = groupsValidationSchema.validate(req.body);
    const newGroup = await createGroup(req.body);
    res.status(201).json(newGroup);
});

groups.put('/:id', async (req, res) => {
    const updatedGroup = await updateGroup(req.params.id, req.body);
    res.json(updatedGroup);
});

groups.delete('/:id', async (req, res) => {
    const deletedGroup = await deleteGroup(req.params.id);
    res.json(deletedGroup);
});

module.exports = groups;
