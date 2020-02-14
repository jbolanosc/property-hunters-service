import { Router } from "express";
const router = Router();

import AgentRouter from "./agent.routes";
import UserRouter from "./user.routes";
import PropertyRouter from "./property.routes";

router.use("/", AgentRouter);
router.use("/", UserRouter);
router.use("/", PropertyRouter);

export default router;
