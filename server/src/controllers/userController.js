const UserService = require("../services/userService");
const response = require("../helper/response");

const getUserByUsername = async (req, res) => {
    const { username } = req.params;
    const user = await UserService.getUserByUsername(username);
    return response.success(res, user);
}

const register = async (req, res) => {
    const { username, password } = req.body;
    const newUser = await UserService.registerUser(username, password);
    return response.success(res, newUser);
}

const updateUserName = async (req, res) => {
    const { newUsername, userId } = req.body;
    const updatedUsername = await UserService.updateUserName(userId, newUsername);
    return response.success(res, { username: updatedUsername });
}

const deleteUser = async (req, res) => {
    const { userId } = req.body;
    var deletedUsername = await UserService.deleteUser(userId);
    return response.success(res, { message: `User ${deletedUsername} deleted successfully` });
}
 
module.exports = {
    getUserByUsername,
    register,
    updateUserName,
    deleteUser
};