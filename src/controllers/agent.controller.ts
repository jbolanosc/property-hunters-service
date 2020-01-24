import { Request, Response } from "express";

import Agent from "../models/Agent";
import { genPassword } from "../libs/bcrypt";

export async function getAgents(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const agents = await Agent.find();
    return res.json(agents).status(200);
  } catch (ex) {
    return res.json(ex).status(500);
  }
}

export async function createAgent(
  req: IMulterRequest,
  res: Response
): Promise<Response> {
  try {
    const { name, lastname, email, company, phone } = req.body;

    if (name && lastname && req.body.password && email && company && phone) {
      const existAgent = await Agent.findOne({ email: email });
      if (existAgent) {
        res.json({ msg: "The email provided is already in use" });
      } else {
        const password = await genPassword(req.body.password);
        const newAgent = {
          name,
          lastname,
          password,
          email,
          company,
          phone,
          imagePath: req.file.url || ""
        };

        const agent = new Agent(newAgent);
        await agent.save();
        return res
          .json({
            message: "Agent Saved Successfully",
            agent
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

export async function getAgent(req: Request, res: Response): Promise<Response> {
  const { id } = req.params;
  const agent = await Agent.findById(id);
  if (agent) {
    return res.json(agent).status(200);
  } else {
    return res.json({ msg: "No agent found." }).status(400);
  }
}

export async function deleteAgent(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const { id } = req.params;
    const agent = await Agent.findByIdAndRemove(id);
    if (agent) {
      return res.json({ message: "Agent Deleted" }).status(200);
    } else {
      return res.json({ msg: "No agent found." }).status(400);
    }
  } catch (ex) {
    return res.json(ex).status(500);
  }
}

export async function updateAgent(
  req: IMulterRequest,
  res: Response
): Promise<Response> {
  try {
    const { id } = req.params;
    const { name, lastname, email, company, phone } = req.body;
    if (name && lastname && req.body.password && email && company && phone) {
      const password = await genPassword(req.body.password);
      const updatedAgent = await Agent.findByIdAndUpdate(id, {
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

export interface IMulterRequest extends Request {
  file: any;
}
