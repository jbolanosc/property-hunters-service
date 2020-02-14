"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const saltRounds = 10;
async function genPassword(password) {
    const salt = bcrypt_1.default.genSaltSync(saltRounds);
    const hash = bcrypt_1.default.hashSync(password, salt);
    return hash;
}
exports.genPassword = genPassword;
async function passwordCompareSync(passwordToTest, passwordHash) {
    console.log(passwordToTest);
    console.log(passwordHash);
    return bcrypt_1.default.compareSync(passwordToTest, passwordHash);
}
exports.passwordCompareSync = passwordCompareSync;
//# sourceMappingURL=bcrypt.js.map