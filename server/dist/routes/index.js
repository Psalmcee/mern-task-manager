"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordResetRouter = exports.taskRouter = exports.authRouter = void 0;
var auth_1 = require("./auth");
Object.defineProperty(exports, "authRouter", { enumerable: true, get: function () { return auth_1.router; } });
var tasks_1 = require("./tasks");
Object.defineProperty(exports, "taskRouter", { enumerable: true, get: function () { return tasks_1.router; } });
var reset_password_1 = require("./reset-password");
Object.defineProperty(exports, "passwordResetRouter", { enumerable: true, get: function () { return reset_password_1.router; } });
