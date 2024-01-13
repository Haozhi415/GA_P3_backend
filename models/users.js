const daoUsers = require("../daos/users");

module.exports = {
    getAllUsers,
    getUser,
    createUser
}

function getAllUsers(queryFields) {
    return daoUsers.find(queryFields);
}

function getUser(id) {
    id = parseInt(id);
    return daoUsers.find((user) => user.id === id);
}

async function createUser(body) {
    // Check if user already exists in DB
    const user = await daoUsers.findOne({ "email": body.email });
    if (user) {
        return { success: false, error: "User already exists." }
    } 

    // If new user, create user profile
    const newUser = await daoUsers.create(body);
    return { success: true, data: newUser };
}