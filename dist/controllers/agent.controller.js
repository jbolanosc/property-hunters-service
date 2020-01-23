"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Agent_1 = __importDefault(require("../models/Agent"));
async function getAgents(req, res) {
    try {
        const agents = await Agent_1.default.find();
        return res.json(agents);
    }
    catch (ex) {
        return res.json(ex);
    }
}
exports.getAgents = getAgents;
async function createAgent(req, res) {
    try {
        const { name, lastname, password, email, company, phone } = req.body;
        const newAgent = {
            name,
            lastname,
            password,
            email,
            company,
            phone,
            imagePath: req.file.url
        };
        const agent = new Agent_1.default(newAgent);
        await agent.save();
        return res.json({
            message: "Agent Saved Successfully",
            agent
        });
    }
    catch (ex) {
        return res.json(ex);
    }
}
exports.createAgent = createAgent;
async function getAgent(req, res) {
    const { id } = req.params;
    const agent = await Agent_1.default.findById(id);
    if (agent) {
        return res.json(agent);
    }
    else {
        return res.json({ msg: "No agent found." });
    }
}
exports.getAgent = getAgent;
async function deleteAgent(req, res) {
    try {
        const { id } = req.params;
        const agent = await Agent_1.default.findByIdAndRemove(id);
        if (agent) {
            return res.json({ message: "Agent Deleted" });
        }
        else {
            return res.json({ msg: "No agent found." });
        }
    }
    catch (ex) {
        return res.json(ex);
    }
}
exports.deleteAgent = deleteAgent;
async function updateAgent(req, res) {
    try {
        const { id } = req.params;
        const { name, lastname, password, email, company, phone } = req.body;
        const updatedAgent = await Agent_1.default.findByIdAndUpdate(id, {
            name,
            lastname,
            password,
            email,
            company,
            phone,
            imagePath: req.file.url
        });
        return res.json({
            message: "Successfully updated",
            updatedAgent
        });
    }
    catch (ex) {
        res.json(ex);
    }
}
exports.updateAgent = updateAgent;
//# sourceMappingURL=agent.controller.js.map