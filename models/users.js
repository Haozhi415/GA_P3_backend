const daoUsers = require("../daos/users");

module.exports = {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}

function getAllUsers(queryFields) {
    return daoUsers.find(queryFields);
}

async function getUser(id) {
    try {
        const user = await daoUsers.findById(id);

        return {
            user_id: user._id,
            name: user.name,
            email: user.email,
            password: user.password,
            recipes: user.recipes,
            bio: user.bio,
            reviews: user.reviews,
            favourites: user.favourites
        }
    } catch(err) {
        console.log(err);
        throw new Error(err.message || "An error occurred");
    }
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

async function updateUser(id, profile) {
    const updatedProfile = await daoUsers.findByIdAndUpdate(id, profile, { new: true });
    return updatedProfile;
}   

async function deleteUser(id) {
    await daoUsers.findByIdAndDelete(id);
}