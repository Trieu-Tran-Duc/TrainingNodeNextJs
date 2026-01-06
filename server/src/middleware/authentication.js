const jwt = require("jsonwebtoken");
const response = require("../helper/response");

module.exports = (req, res, next) => {

  const bypassRoutes = ["/api/login", "/api/user/register-user", "/api/refresh-token", "/", "/api/scans"]; 

  if (bypassRoutes.includes(req.path)) {
    return next(); 
  }
  
  const token = req.cookies.accessToken;
  if (!token) return response.unauthorized(res, 401, "Unauthorized: Missing token");

  // const authHeader = req.headers.authorization;

  // if (!authHeader || !authHeader.startsWith("Bearer ")) {
  //   return response.unauthorized(res, 401, "Unauthorized: Missing token");
  // }

  //const token = authHeader.split(" ")[1];
  //if (!token) return response.unauthorized(res, 401, "No token");

  try {

    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();

  } catch (err) {

    if (err.name === "TokenExpiredError") {
      return response.unauthorized(res, 401, "Token expired");
    }

    return response.unauthorized(res, 401, "Invalid token");
  }
};
