"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlerMiddleware = void 0;
const http_status_codes_1 = require("http-status-codes");
const errorHandlerMiddleware = (err, req, res, next) => {
    const customError = {
        StatusCodes: err.StatusCodes || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong try again later'
    };
    if (err.name === 'ValidationError') {
        customError.StatusCodes = 400;
        customError.msg = Object.values(err.errors).map((item) => item.message).join(',');
    }
    if (err.code && err.code === 11000) {
        customError.StatusCodes = 400;
        customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value`;
    }
    if (err.name === 'CastError') {
        customError.StatusCodes = 404;
        customError.msg = `No item found with id : ${err.value}`;
    }
    return res.status(customError.StatusCodes).json({ msg: customError.msg });
};
exports.errorHandlerMiddleware = errorHandlerMiddleware;
