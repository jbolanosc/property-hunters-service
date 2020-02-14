"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const uuid_1 = __importDefault(require("uuid"));
const AgentSession = new mongoose_1.Schema({
    id: {
        type: String,
        default: () => uuid_1.default.v4()
    },
    agentId: {
        type: String,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    }
}, { timestamps: true });
exports.default = mongoose_1.model("AgentSession", AgentSession, "AgentSessions");
//# sourceMappingURL=AgentSession.js.map