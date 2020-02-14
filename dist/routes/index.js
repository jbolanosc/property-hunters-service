"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const agent_routes_1 = __importDefault(require("./agent.routes"));
const user_routes_1 = __importDefault(require("./user.routes"));
const property_routes_1 = __importDefault(require("./property.routes"));
router.use("/", agent_routes_1.default);
router.use("/", user_routes_1.default);
router.use("/", property_routes_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map