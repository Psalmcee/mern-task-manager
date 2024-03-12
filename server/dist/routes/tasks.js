"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const controller_1 = require("../controller");
exports.router = (0, express_1.Router)();
exports.router.route('/').get(controller_1.getAllTasks).post(controller_1.createTask);
exports.router.route('/:id').get(controller_1.getTask).patch(controller_1.updateTask).delete(controller_1.deleteTask);
