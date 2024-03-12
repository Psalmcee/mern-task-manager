"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const controller_1 = require("../controller");
exports.router = (0, express_1.Router)();
exports.router.route('/forgot-password').post(controller_1.forgotPassword);
exports.router.route('/reset-password/:id/:token').get(controller_1.getResetToken).post(controller_1.resetPassword);
