const modelUsers = require('../models/users');

module.exports = {
    getAllUsers,
    getUser,
    createUser,
    updateUser
}

async function getAllUsers(req, res) {
    try {
        const userData = await modelUsers.getAllUsers(req.query);
        res.json({ users: userData });
    } catch(err) {
        res.status(500).json({ errorMsg: err.essage });
    }
}

async function getUser(req, res) {
    try {
        const user = await modelUsers.getUser(req.params.id);
        res.json({ user: user });
    } catch(err) {
        console.log(err);
        res.status(500).json({ errorMsg: err.message });
    }
}

async function createUser(req, res) {
    try {
        const userData = await modelUsers.createUser(req.body);
        
        res.status(201).json(userData);
        console.log(userData);
    } catch(err) {
        console.log(err);
        res.status(500).json({ errorMsg: err.message });
    }
}

async function updateUser(req, res) {
    try {
        const updatedProfile = await modelUsers.updateUser(req.params.id, req.body);
        res.status(200).json(updatedProfile);
    } catch(err) {
        console.log(err);
        res.status(500).json({ errorMsg: err.message });
    }
}