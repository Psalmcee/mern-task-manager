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
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
exports.app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./db");
const dotenv_1 = __importDefault(require("dotenv"));
const middlewares_1 = require("./middlewares");
dotenv_1.default.config();
exports.app.use((0, cors_1.default)());
const port = process.env.PORT || 5555;
exports.app.use(express_1.default.static('./public'));
exports.app.use(express_1.default.urlencoded({ extended: false }));
exports.app.use(express_1.default.json());
const http_1 = __importDefault(require("http"));
const server = http_1.default.createServer(exports.app);
exports.app.get('/', (req, res) => {
    //res.send("Mern Task Manager..");
    res.json({ message: `Connected to server 👍` });
});
exports.app.use('/auth', routes_1.authRouter);
exports.app.use('/tasks', middlewares_1.authenticationMiddleware, routes_1.taskRouter);
exports.app.use('/account', routes_1.passwordResetRouter);
exports.app.use(middlewares_1.notFoundMiddleware);
exports.app.use(middlewares_1.errorHandlerMiddleware);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_1.connectDB)(process.env.MONGO_URI);
    server.listen(port, () => {
        console.log(`server is running on port ${port}...
    🚀@ http://localhost:${port}`);
    });
});
start();
