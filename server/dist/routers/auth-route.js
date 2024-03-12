"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const auth_1 = require("../controller/auth");
exports.router = (0, express_1.Router)();
exports.router.route('/login').post(auth_1.login);
exports.router.route('/register').post(auth_1.register);
exports.router.route('/signin/:id').get(auth_1.signin);
