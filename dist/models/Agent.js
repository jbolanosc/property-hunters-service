"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Agent = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    imagePath: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    }
}, { timestamps: true });
exports.default = mongoose_1.model("images", Agent);
//# sourceMappingURL=Agent.js.map