import { Router } from "express";
const AgentRouter = Router();

import {
  getAgents,
  createAgent,
  getAgent,
  updateAgent,
  deleteAgent,
  createSession
} from "../controllers/agent.controller";
import { parser } from "../libs/imageConfig";

// routes
AgentRouter.route("/agents")
  .get(getAgents)
  .post(parser.single("image"), createAgent);

AgentRouter.route("/agents/session").post(createSession);

AgentRouter.route("/agent/:id")
  .get(getAgent)
  .delete(deleteAgent)
  .put(updateAgent);

export default AgentRouter;
