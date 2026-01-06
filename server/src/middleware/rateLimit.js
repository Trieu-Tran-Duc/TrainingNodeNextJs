const rateLimit = require("express-rate-limit");

const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000000000000000,
  message: "Too many login attempts, please try again later"
});

const refreshLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 10,
  message: "Too many refresh requests, please try again later",
});

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests, try later",
});


module.exports = { loginRateLimiter, refreshLimiter, generalLimiter };
