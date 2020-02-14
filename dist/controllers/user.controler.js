"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const date_fns_1 = require("date-fns");
const User_1 = __importDefault(require("../models/User"));
const Session_1 = __importDefault(require("../models/Session"));
const bcrypt_1 = require("../libs/bcrypt");
async function getUsers(req, res) {
    try {
        const users = await User_1.default.find();
        return res.json(users).status(200);
    }
    catch (ex) {
        return res.json(ex).status(500);
    }
}
exports.getUsers = getUsers;
async function createUser(req, res) {
    try {
        const { name, lastname, email, phone } = req.body;
        if (name && lastname && req.body.password && email && phone) {
            const existUser = await User_1.default.findOne({ email: email });
            if (existUser) {
                res.json({ msg: "The email provided is already in use" });
            }
            else {
                const password = await bcrypt_1.genPassword(req.body.password);
                const newUser = {
                    name,
                    lastname,
                    password,
                    email,
                    phone,
                    imagePath: req.file.url || ""
                };
                const user = new User_1.default(newUser);
                await user.save();
                return res
                    .json({
                    message: "Agent Saved Successfully",
                    user
                })
                    .status(200);
            }
        }
        else {
            return res
                .json({
                message: "All fields are required"
            })
                .status(400);
        }
    }
    catch (ex) {
        return res.json(ex).status(500);
    }
}
exports.createUser = createUser;
async function getUser(req, res) {
    const { id } = req.params;
    const user = await User_1.default.findById(id);
    if (user) {
        return res.json(user).status(200);
    }
    else {
        return res.json({ msg: "No user found." }).status(400);
    }
}
exports.getUser = getUser;
async function deleteUser(req, res) {
    try {
        const { id } = req.params;
        const user = await User_1.default.findByIdAndRemove(id);
        if (user) {
            return res.json({ message: "User Deleted" }).status(200);
        }
        else {
            return res.json({ msg: "No User found." }).status(400);
        }
    }
    catch (ex) {
        return res.json(ex).status(500);
    }
}
exports.deleteUser = deleteUser;
async function updateUser(req, res) {
    try {
        const { id } = req.params;
        const { name, lastname, email, phone } = req.body;
        if (name && lastname && req.body.password && email && phone) {
            const password = await bcrypt_1.genPassword(req.body.password);
            const updatedUser = await User_1.default.findByIdAndUpdate(id, {
                name,
                lastname,
                password,
                email,
                phone,
                imagePath: req.file.url
            });
            return res
                .json({
                message: "Successfully updated",
                updatedUser
            })
                .status(200);
        }
        else {
            return res
                .json({
                message: "All fields are required"
            })
                .status(400);
        }
    }
    catch (ex) {
        res.json(ex).status(500);
    }
}
exports.updateUser = updateUser;
async function createSession(req, res, next) {
    const SESSION_EXPIRY_HOURS = 1;
    if (!req.body.email || !req.body.password)
        return res.json("Invalid data").status(400);
    try {
        const user = await User_1.default.findOne({ email: req.body.email });
        const password = await bcrypt_1.passwordCompareSync(req.body.password, user.password);
        if (!password)
            return res.json("invalid password or username").status(400);
        const expiresAt = date_fns_1.addHours(new Date(), SESSION_EXPIRY_HOURS);
        const session = new Session_1.default({
            userId: user.id,
            expiresAt: expiresAt
        });
        await session.save();
        res.cookie("agentSessionId", session.id, {
            httpOnly: true,
            expires: expiresAt
        });
        return res.json(session);
    }
    catch (ex) {
        return res.json("An error Ocurred " + ex).status(500);
    }
}
exports.createSession = createSession;
//# sourceMappingURL=user.controler.js.map