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
exports.login = exports.register = void 0;
const http_status_codes_1 = require("http-status-codes");
const User_1 = __importDefault(require("../model/User"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.create(Object.assign({}, req.body));
        const token = user.createJWT();
        res.status(http_status_codes_1.StatusCodes.CREATED).send(`<h1>Account registered successfully</h1>` /* {user: req.body, token} */);
    }
    catch (error) {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(error.message);
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send('Please provide email and password');
        return;
    }
    const user = yield User_1.default.findOne({ email });
    if (!user) {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send('Invalid Email');
        return;
    }
    const isPasswordCorrect = yield user.comparePassword(password);
    if (!isPasswordCorrect) {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send('Incorrect Password');
        return;
    }
    const token = user.createJWT();
    res.status(http_status_codes_1.StatusCodes.ACCEPTED).send({ msg: "Login successful...", token, email, name: user.name });
});
exports.login = login;
