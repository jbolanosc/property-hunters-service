"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const date_fns_1 = require("date-fns");
const Agent_1 = __importDefault(require("../models/Agent"));
const AgentSession_1 = __importDefault(require("../models/AgentSession"));
const bcrypt_1 = require("../libs/bcrypt");
async function getAgents(req, res) {
    try {
        const agents = await Agent_1.default.find();
        return res.json(agents).status(200);
    }
    catch (ex) {
        return res.json(ex).status(500);
    }
}
exports.getAgents = getAgents;
async function createAgent(req, res) {
    try {
        const { name, lastname, email, company, phone } = req.body;
        if (name && lastname && req.body.password && email && company && phone) {
            const existAgent = await Agent_1.default.findOne({ email: email });
            if (existAgent) {
                res.json({ msg: "The email provided is already in use" });
            }
            else {
                const password = await bcrypt_1.genPassword(req.body.password);
                const newAgent = {
                    name,
                    lastname,
                    password,
                    email,
                    company,
                    phone,
                    imagePath: req.file.url || ""
                };
                const agent = new Agent_1.default(newAgent);
                await agent.save();
                return res
                    .json({
                    message: "Agent Saved Successfully",
                    agent
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
exports.createAgent = createAgent;
async function getAgent(req, res) {
    const { id } = req.params;
    const agent = await Agent_1.default.findById(id);
    if (agent) {
        return res.json(agent).status(200);
    }
    else {
        return res.json({ msg: "No agent found." }).status(400);
    }
}
exports.getAgent = getAgent;
async function deleteAgent(req, res) {
    try {
        const { id } = req.params;
        const agent = await Agent_1.default.findByIdAndRemove(id);
        if (agent) {
            return res.json({ message: "Agent Deleted" }).status(200);
        }
        else {
            return res.json({ msg: "No agent found." }).status(400);
        }
    }
    catch (ex) {
        return res.json(ex).status(500);
    }
}
exports.deleteAgent = deleteAgent;
async function updateAgent(req, res) {
    try {
        const { id } = req.params;
        const { name, lastname, email, company, phone } = req.body;
        if (name && lastname && req.body.password && email && company && phone) {
            const password = await bcrypt_1.genPassword(req.body.password);
            const updatedAgent = await Agent_1.default.findByIdAndUpdate(id, {
                name,
                lastname,
                password,
                email,
                company,
                phone,
                imagePath: req.file.url
            });
            return res
                .json({
                message: "Successfully updated",
                updatedAgent
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
exports.updateAgent = updateAgent;
async function createSession(req, res, next) {
    const SESSION_EXPIRY_HOURS = 1;
    if (!req.body.email || !req.body.password)
        return res.json("Invalid data").status(400);
    try {
        const agent = await Agent_1.default.findOne({ email: req.body.email });
        const password = await bcrypt_1.passwordCompareSync(req.body.password, agent.password);
        if (!password)
            return res.json("invalid password or username").status(400);
        const expiresAt = date_fns_1.addHours(new Date(), SESSION_EXPIRY_HOURS);
        const agentSession = new AgentSession_1.default({
            agentId: agent.id,
            expiresAt: expiresAt
        });
        await agentSession.save();
        res.cookie("agentSessionId", agentSession.id, {
            httpOnly: true,
            expires: expiresAt
        });
        return res.json(agentSession);
    }
    catch (ex) {
        return res.json("An error Ocurred " + ex).status(500);
    }
}
exports.createSession = createSession;
//# sourceMappingURL=agent.controller.js.map