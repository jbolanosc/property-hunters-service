import { Request, Response, NextFunction } from "express";
import { addHours } from "date-fns";

import User from "../models/User";
import Session from "../models/Session";
import { genPassword, passwordCompareSync } from "../libs/bcrypt";

export async function getUsers(req: Request, res: Response): Promise<Response> {
  try {
    const users = await User.find();
    return res.json(users).status(200);
  } catch (ex) {
    return res.json(ex).status(500);
  }
}

export async function createUser(
  req: IMulterRequest,
  res: Response
): Promise<Response> {
  try {
    const { name, lastname, email, phone } = req.body;

    if (name && lastname && req.body.password && email && phone) {
      const existUser = await User.findOne({ email: email });
      if (existUser) {
        res.json({ msg: "The email provided is already in use" });
      } else {
        const password = await genPassword(req.body.password);
        const newUser = {
          name,
          lastname,
          password,
          email,
          phone,
          imagePath: req.file.url || ""
        };

        const user = new User(newUser);
        await user.save();
        return res
          .json({
            message: "Agent Saved Successfully",
            user
          })
          .status(200);
      }
    } else {
      return res
        .json({
          message: "All fields are required"
        })
        .status(400);
    }
  } catch (ex) {
    return res.json(ex).status(500);
  }
}

export async function getUser(req: Request, res: Response): Promise<Response> {
  const { id } = req.params;
  const user = await User.findById(id);
  if (user) {
    return res.json(user).status(200);
  } else {
    return res.json({ msg: "No user found." }).status(400);
  }
}

export async function deleteUser(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndRemove(id);
    if (user) {
      return res.json({ message: "User Deleted" }).status(200);
    } else {
      return res.json({ msg: "No User found." }).status(400);
    }
  } catch (ex) {
    return res.json(ex).status(500);
  }
}

export async function updateUser(
  req: IMulterRequest,
  res: Response
): Promise<Response> {
  try {
    const { id } = req.params;
    const { name, lastname, email, phone } = req.body;
    if (name && lastname && req.body.password && email && phone) {
      const password = await genPassword(req.body.password);
      const updatedUser = await User.findByIdAndUpdate(id, {
        name,
        lastname,
        password,
        email,
        phone,
        imagePath: req.file.url
      });
      return res
        .json({
          message: "Successfully updated",
          updatedUser
        })
        .status(200);
    } else {
      return res
        .json({
          message: "All fields are required"
        })
        .status(400);
    }
  } catch (ex) {
    res.json(ex).status(500);
  }
}

export async function createSession(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const SESSION_EXPIRY_HOURS = 1;
  if (!req.body.email || !req.body.password)
    return res.json("Invalid data").status(400);

  try {
    const user = await User.findOne({ email: req.body.email });
    const password: boolean = await passwordCompareSync(
      req.body.password,
      user.password
    );
    if (!password) return res.json("invalid password or username").status(400);

    const expiresAt = addHours(new Date(), SESSION_EXPIRY_HOURS);

    const session = new Session({
      userId: user.id,
      expiresAt: expiresAt
    });
    await session.save();

    res.cookie("agentSessionId", session.id, {
      httpOnly: true,
      expires: expiresAt
    });

    return res.json(session);
  } catch (ex) {
    return res.json("An error Ocurred " + ex).status(500);
  }
}

export interface IMulterRequest extends Request {
  file: any;
}
