const daoUsers = require("../daos/users");
const utilSecurity = require("../util/security");

module.exports = {
    getAllUsers,
    getUser,
    getLoginDetails,
    loginUser,
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

async function getLoginDetails(queryFields) {
    const loginFields = {
      name : 1,
      salt: 1,
      iterations: 1
    } 
    if (!queryFields.hasOwnProperty("email")){
      return {success: false, error: "missing email"};
    }
    // url decode email '@' -> %40 
    const userEmail = decodeURIComponent(queryFields.email);
    const loginFieldsRes = await daoUsers.findOne({"email": userEmail}, loginFields);
    return {success: true, data: loginFieldsRes};
}

async function loginUser(body) {
    if (!body.hasOwnProperty("email")) {
      return {success: false, error: "missing email"};
    }
    if (!body.hasOwnProperty("password")) {
      return {success: false, error: "missing password"};
    }
  
    const user = await daoUsers.findOne({"email": body.email, "password": body.password});
    if (user == null || Object.keys(user).length == 0) {
      return {success: false, error: "Invalid email/password"};
    }
    
    const jwtPayload = {
      user: user.name,
      email: user.email,
      is_admin: user.is_admin
    };

    const token = utilSecurity.createJWT(jwtPayload);
    const expiry = utilSecurity.getExpiry(token);
    daoUsers.updateOne({"email": body.email}, {token: token, expire_at: expiry})
    return {success: true, data: token}
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