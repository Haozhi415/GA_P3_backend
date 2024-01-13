const modelUsers = require('../models/users');

module.exports = {
    getAllUsers,
    getUser,
    createUser
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
    res.json({
        user: modelUsers.getUser(req.params.id)
    })
}

async function createUser(req, res) {
    try {
        const userData = await modelUsers.createUser(req.body);
        console.log(userData);
    } catch(err) {
        console.log(err);
        res.status(500).json({ errorMsg: err.message });
    }
}