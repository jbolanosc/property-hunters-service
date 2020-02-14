"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AgentRouter = express_1.Router();
const agent_controller_1 = require("../controllers/agent.controller");
const imageConfig_1 = require("../libs/imageConfig");
// routes
AgentRouter.route("/agents")
    .get(agent_controller_1.getAgents)
    .post(imageConfig_1.parser.single("image"), agent_controller_1.createAgent);
AgentRouter.route("/agents/session").post(agent_controller_1.createSession);
AgentRouter.route("/agent/:id")
    .get(agent_controller_1.getAgent)
    .delete(agent_controller_1.deleteAgent)
    .put(agent_controller_1.updateAgent);
exports.default = AgentRouter;
//# sourceMappingURL=agent.routes.js.map