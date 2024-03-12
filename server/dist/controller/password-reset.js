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
exports.resetPassword = exports.getResetToken = exports.forgotPassword = void 0;
const User_1 = __importDefault(require("../model/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const user = yield User_1.default.findOne({ email });
    if (!user) {
        return res.status(404).send({
            message: "Email not found"
        });
    }
    const resetToken = jsonwebtoken_1.default.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });
    user.token = resetToken;
    yield user.save();
    res.json(user.token);
    //sending a mail to the user's email for authorization
    const transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        },
        tls: {
            rejectUnauthorized: false,
        },
        port: 465,
        host: "smtp.gmail.com",
    });
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Password Reset",
        html: `Click <a href="http://localhost:5555/account/reset-password/${user.id}/${user.token}">Here</a> to change your password.`
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        }
        else {
            console.log("Email sent: " /* + info.response */);
        }
    });
});
exports.forgotPassword = forgotPassword;
const getResetToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, token } = req.params;
    try {
        const user = yield User_1.default.findById({ _id: id });
        if (!user) {
            return res.status(408).send({
                message: "User not found"
            });
        }
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        res.redirect(`http://localhost:3000/reset-password/${id}/${token}`);
    }
    catch (error) {
        console.log(error.message);
    }
});
exports.getResetToken = getResetToken;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, token } = req.params;
    const { password } = req.body;
    try {
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const user = yield User_1.default.findById({ _id: id });
        if (!user) {
            return res.status(400).send({
                message: "Invalid or expired token"
            });
        }
        user.password = yield password;
        user.token = null;
        yield user.save();
        res.json({
            message: "Password reset successful",
            user: { user: user.email, id: user._id }
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.resetPassword = resetPassword;
