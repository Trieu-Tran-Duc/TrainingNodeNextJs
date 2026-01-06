const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateAccessToken, generateRefreshToken } = require("../helper/generateTokens");
const users = require("../utils/users");
const ErrorHandler = require("../helper/errorHandler");

class AuthService {

    async login(username, password) {

        const user = users.find(u => u.username === username);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new ErrorHandler("Invalid username or password", 404);
        }

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        user.refreshToken = refreshToken;
        return { accessToken, refreshToken, user: { id: user.id, username: user.username, role: user.role } };
    }

    async refreshToken(oldRefreshToken) {
        if (!oldRefreshToken) {
            throw new ErrorHandler("Refresh token required", 401);
        }

        const user = users.find(u => u.refreshToken === oldRefreshToken);
        if (!user) {
            throw new ErrorHandler("Invalid refresh token", 403);
        }

        try {

            jwt.verify(oldRefreshToken, process.env.JWT_REFRESH_SECRET);

            const newAccessToken = generateAccessToken(user);
            const newRefreshToken = generateRefreshToken(user);

            user.refreshToken = newRefreshToken;
            return { newAccessToken, newRefreshToken };

        } catch (err) {
            throw new ErrorHandler("Refresh token expired", 403);
        }
    }
}

module.exports = new AuthService();