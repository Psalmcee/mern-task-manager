"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
function errorHandler(err, req, res, next) {
    console.log(err.stack);
    res.status(err.status).json(err.message);
}
exports.errorHandler = errorHandler;
