const express = require("express");
const router = express.Router();
const middleware = require("../middleware");

/*
  summary
  method: HTTP method (GET, POST, etc.) from METHOD_ENUM
  path: API endpoint path
  controller: Controller function to handle the request
  role: (optional) Role required to access the route from ROLE_ENUM
  rateLimit: (optional) Rate limit configuration
*/
const baseRouter = (method, path, controller, options ={}) => {
  const { role, rateLimiter = middleware.generalLimiter } = options;

  const middlewares = [];

  middlewares.push(rateLimiter)

  if (role) {
    middlewares.push(middleware.authentication);
    middlewares.push(middleware.authorization(role));
  }  
 
  middlewares.push(controller);

  router[method](path, middleware.generalLimiter, ...middlewares);

  return router;
};

module.exports = { router, baseRouter };