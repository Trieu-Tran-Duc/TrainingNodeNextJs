const response = require("../helper/response");
const AuthService = require("../services/authService");
/*
  summary: Login user and generate tokens
*/
const login = async (req, res) => {
  const { username, password } = req.body;
  const { accessToken, refreshToken, user } = await AuthService.login(username, password);
  
  res.cookie('accessToken', accessToken, {
    httpOnly: true,       
    secure: false,       
    sameSite: 'lax',      
    maxAge: 24 * 60 * 60 * 1000
  })

  return response.success(res, { user });
  
};

/*
  summary: Refresh access token using refresh token
*/
const refreshToken = async (req, res) => {
  const { oldRefreshToken } = req.body;
  var { newAccessToken, newRefreshToken } = await AuthService.refreshToken(oldRefreshToken);
  
  res.cookie('accessToken', newAccessToken, {
    httpOnly: true,       
    secure: false,       
    sameSite: 'lax',      
    maxAge: 24 * 60 * 60 * 1000
  })

  return response.success(res, { refreshToken: newRefreshToken });

};

const adminOnly = async (req, res) => {
  return response.success(res, { message: "Admin access granted" });
};

const userOnly = async (req, res) => {
  return response.success(res, { message: "User access granted" });
};

module.exports = {
  login,
  refreshToken,
  adminOnly,
  userOnly
};
