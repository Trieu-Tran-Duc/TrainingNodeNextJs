const users = require("../utils/users");
const { ROLE_ENUM } = require("../utils/enumSystem")
const bcrypt = require("bcrypt");
const ErrorHandler = require("../helper/errorHandler");

class UserService {

    async getUserByUsername(username) {
        var user = await users.find(u => u.username === username);
        if (!user) {
           throw new ErrorHandler("User not found", 404);
        }
        
        return { 
            id: user.id, 
            username: user.username, 
            role: user.role 
        };
    }

    async registerUser(username, password) {
        const exists = users.find(u => u.username === username);

        if (exists) {
            throw new ErrorHandler("Username already exists", 400);
        }
        const newUser = {
            id: users.length + 1,
            username,
            password: await bcrypt.hash(password, 10),
            role: ROLE_ENUM.USER,
            refreshToken: null
        };

        users.push(newUser);

        return { 
            id: newUser.id, 
            username: newUser.username, 
            role: newUser.role 
        };
    }

    async updateUserName(userId, newUsername) {
        const user = users.find(u => u.id === userId);
        if (!user) {
            throw new ErrorHandler("User not found", 404);
        }  
        user.username = newUsername;
        return newUsername;
    }

    async deleteUser(userId) {
        const user = users.find(u => u.id === userId);
        if ( !user) {
            throw new ErrorHandler("User not found", 404);
        }
        users.splice(users.indexOf(user), 1);
        return user.username;
    }
}

module.exports = new UserService();