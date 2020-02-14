"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserRouter = express_1.Router();
const user_controler_1 = require("../controllers/user.controler");
const imageConfig_1 = require("../libs/imageConfig");
// routes
UserRouter.route("/users")
    .get(user_controler_1.getUsers)
    .post(imageConfig_1.parser.single("image"), user_controler_1.createUser);
UserRouter.route("/users/session").post(user_controler_1.createSession);
UserRouter.route("/user/:id")
    .get(user_controler_1.getUser)
    .delete(user_controler_1.deleteUser)
    .put(user_controler_1.updateUser);
exports.default = UserRouter;
//# sourceMappingURL=user.routes.js.map