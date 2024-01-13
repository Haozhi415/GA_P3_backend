const daoUsers = require("../daos/users");

module.exports = {
    getAllUsers,
    getUser
}

function getAllUsers(queryFields) {
    return daoUsers.find(queryFields);
}

function getUser(id) {
    id = parseInt(id);
    return daoUsers.find((user) => user.id === id);
}

