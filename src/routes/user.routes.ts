import { Router } from "express";
const UserRouter = Router();

import {
  getUser,
  getUsers,
  createUser,
  createSession,
  deleteUser,
  updateUser
} from "../controllers/user.controler";
import { parser } from "../libs/imageConfig";

// routes
UserRouter.route("/users")
  .get(getUsers)
  .post(parser.single("image"), createUser);

UserRouter.route("/users/session").post(createSession);

UserRouter.route("/user/:id")
  .get(getUser)
  .delete(deleteUser)
  .put(updateUser);

export default UserRouter;
