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
Object.defineProperty(exports, "__esModule", { value: true });
exports.signin = exports.login = exports.register = void 0;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).json({ body: req.body });
    }
    catch (error) {
        res.status(500).json({ message: 'Error' });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).json({ id: req.params.id, body: req.body });
    }
    catch (error) {
        res.status(500).json({ message: 'Error' });
    }
});
exports.login = login;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).json({ id: req.params.id });
    }
    catch (error) {
        res.status(500).json({ message: 'Error' });
    }
});
exports.signin = signin;
