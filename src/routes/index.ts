import { Router } from "express";
const router = Router();

import {
  getAgents,
  createAgent,
  getAgent,
  updateAgent,
  deleteAgent
} from "../controllers/agent.controller";
import { parser } from "../libs/imageConfig";

// routes
router
  .route("/agents")
  .get(getAgents)
  .post(parser.single("image"), createAgent);

router
  .route("/agent/:id")
  .get(getAgent)
  .delete(deleteAgent)
  .put(updateAgent);


export default router;
