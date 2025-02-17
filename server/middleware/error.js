const errorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) =>{

    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server Error";

    if(err.name === "CastError"){
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new errorHandler(message, 400);
    }

      if(err.code === 11000) {
        const message = `duplicate ${Object.keys(err.keyValue)} Entered`

        err = new errorHandler(message, 400);
    }

     if(err.code === "JsonWebTokenError") {
        const message = `Json web token is invalid, please try again`

        err = new errorHandler(message, 400);
    }

     if(err.code === "TokenExpiredError") {
        const message = `Json web token is Expired, please try again`

        err = new errorHandler(message, 400);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    })
};