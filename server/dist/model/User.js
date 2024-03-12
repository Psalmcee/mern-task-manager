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
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserSchema = new mongoose_1.default.Schema({
    /* avatar: {
        type: String,
        required: [true, 'please provide a avatar']
    }, */
    name: {
        type: String,
        required: [true, 'please provide a name']
    },
    email: {
        type: String,
        required: [true, 'please provide a valid email'],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'please include a valid email'],
        unique: true
    },
    location: {
        type: String,
        required: [true, 'please provide a location']
    },
    password: {
        type: String,
        required: [true, 'please provide a password'],
        minlength: [6, 'password must be at least 6 characters']
    },
    date: {
        type: Date,
        default: Date.now
    },
    token: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
//pre save returns the object that was saved and hash the password using bcrypt
UserSchema.pre('save', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const salt = yield bcryptjs_1.default.genSalt(10);
        this.password = yield bcryptjs_1.default.hash(this.password, salt);
    });
});
//schema instance methods are used below to prevent sensitive algorithm from being exposed to the controllers and middlewares 
//createJWT is a method that generates a JWT token for the user. It takes the user's ID and name as input, and returns a JWT token.
UserSchema.methods.createJWT = function () {
    return jsonwebtoken_1.default.sign({ userId: this._id, name: this.name }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME
    });
};
//comparePassword is a method that compares a candidate password with the user's password. It takes the candidate password as input, hashes it using bcrypt, and compares it to the user's password. It returns a boolean indicating whether the passwords match.
UserSchema.methods.comparePassword = function (candidatePassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const isMatch = yield bcryptjs_1.default.compare(candidatePassword, this.password);
        return isMatch;
    });
};
exports.default = mongoose_1.default.model('User', UserSchema);
