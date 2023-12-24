const express = require("express");
const users = express.Router();
const { usersValidationSchema } = require("../validations/checkUsers.js");

const {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser
} = require("../queries/users.js");

users.get("/", async (req, res) => {
    try {
        const allUsers = await getAllUsers();
        res.status(200).json(allUsers);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

users.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const user = await getUserById(id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

users.post("/", validateUser, async (req, res) => {
    try {
        const newUser = await createUser(req.body);
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

users.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await deleteUser(id);
        if (deletedUser) {
            res.status(200).json({ success: true, payload: deletedUser });
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

users.put("/:id", validateUser, async (req, res) => {
    const { id } = req.params;
    try {
        const updatedUser = await updateUser(id, req.body);
        if (updatedUser) {
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

function validateUser(req, res, next) {
    const { error } = userValidationSchema.validate(req.body);
    if (error) {
        res.status(400).json({ error: error.details[0].message });
    } else {
        next();
    }
}

module.exports = users;
