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
        type: String
    },
    company: {
        type: String,
        required: true
    },
    postDate: {
        type: Date,
        default: Date.now
    }
});
exports.default = mongoose_1.model("image", Agent);
//# sourceMappingURL=Agent.js.map