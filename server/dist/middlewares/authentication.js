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
exports.authenticationMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const unauthenticated_1 = require("../errors/unauthenticated");
const authenticationMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    //conditional statement to test if the authHeader is undefined or not starting with Bearer and throw an error if it is not valid. 
    //If it is valid, we extract the token from the authHeader and verify it using the JWT_SECRET environment variable.  
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new unauthenticated_1.UnauthenticatedError('Invalid authorization header');
    }
    //If the token is valid, we extract the userId and name from the payload and set them as properties on the request object. 
    const token = authHeader.split(' ')[1];
    try {
        const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = { userId: payload.userId, username: payload.name };
        //Finally, we call the next middleware function to continue the request processing.
        next();
        //if the authHeader is undefined or not starting with Bearer, throw an error
    }
    catch (error) {
        throw new unauthenticated_1.UnauthenticatedError('Cannot verify user');
    }
});
exports.authenticationMiddleware = authenticationMiddleware;
