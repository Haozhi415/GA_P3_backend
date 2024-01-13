const modelUsers = require('../models/users');

module.exports = {
    getAllUsers,
    getUser
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