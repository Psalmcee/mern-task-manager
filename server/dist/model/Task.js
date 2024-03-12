"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
//schema provides the structure of each data that is going to be stored in the database
exports.taskSchema = new mongoose_1.default.Schema({
    task: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    completed: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'please provide a user']
    }
});
//timestamps provide times at each data schema is created
exports.taskSchema.set('timestamps', true);
exports.default = mongoose_1.default.model('Task', exports.taskSchema);
