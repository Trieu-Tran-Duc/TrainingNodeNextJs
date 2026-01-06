const response = require("../helper/response");
const ErrorHandler = require("../helper/errorHandler");

function errorHandler(err, req, res, next) {
    
    if (err instanceof ErrorHandler) {
        return response.error(res, {
            code: err.statusCode,
            message: err.message
        });
    }
    return response.serverError(res, err.message);
}

module.exports = errorHandler;