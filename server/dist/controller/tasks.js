"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.getTask = exports.createTask = exports.getAllTasks = void 0;
const Task_1 = __importDefault(require("../model/Task"));
const http_status_codes_1 = require("http-status-codes");
const getAllTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tasks = yield Task_1.default.find({ createdBy: req.user.userId });
    return res.status(http_status_codes_1.StatusCodes.OK).json({ msg: tasks, nbHits: tasks.length });
});
exports.getAllTasks = getAllTasks;
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.body.createdBy = req.user.userId;
    const task = yield Task_1.default.create(req.body);
    return res.status(http_status_codes_1.StatusCodes.CREATED).json(task);
});
exports.createTask = createTask;
const getTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user: { userId }, params: { id: taskId } } = req;
        const task = yield Task_1.default.findById({ _id: taskId, createdBy: userId });
        res.status(200).json({ msg: task });
    }
    catch (error) {
        console.log(error.message);
    }
});
exports.getTask = getTask;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user: { userId }, body: { description, completed }, params: { id: taskId } } = req;
        if (description === '' || completed === '') {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ msg: 'Please provide description and completed' });
            return;
        }
        const task = yield Task_1.default.findByIdAndUpdate({ createdBy: userId, _id: taskId }, req.body, {
            new: true,
            runValidators: true
        });
        res.status(202).json(task);
    }
    catch (error) {
        console.log(error.message);
    }
});
exports.updateTask = updateTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user: { userId }, params: { id: taskId } } = req;
    const task = yield Task_1.default.findByIdAndDelete({ createdBy: userId, _id: taskId });
    const allTasks = yield Task_1.default.find({});
    res.status(202).json({ deletedTask: task, remainingTasks: allTasks, nbRemainingTasks: allTasks.length });
});
exports.deleteTask = deleteTask;
