const authentication = require("./authentication");
const authorization = require("./authorization");
const { 
    loginRateLimiter, 
    refreshLimiter, 
    generalLimiter 
} = require("../middleware/rateLimit");

module.exports = { 
    authentication, 
    authorization,
    loginRateLimiter,
    refreshLimiter,
    generalLimiter
 };