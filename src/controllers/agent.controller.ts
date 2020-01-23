import { Request, Response } from "express";

import Agent from "../models/Agent";

export async function getAgents(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const agents = await Agent.find();
    return res.json(agents);
  } catch (ex) {
    return res.json(ex);
  }
}

export async function createAgent(
  req: IMulterRequest,
  res: Response
): Promise<Response> {
  try {
    const { name, lastname, password, email, company, phone } = req.body;
    const newAgent = {
      name,
      lastname,
      password,
      email,
      company,
      phone,
      imagePath: req.file.url
    };

    const agent = new Agent(newAgent);
    await agent.save();
    return res.json({
      message: "Agent Saved Successfully",
      agent
    });
  } catch (ex) {
    return res.json(ex);
  }
}

export async function getAgent(req: Request, res: Response): Promise<Response> {
  const { id } = req.params;
  const agent = await Agent.findById(id);
  if (agent) {
    return res.json(agent);
  } else {
    return res.json({ msg: "No agent found." });
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
      return res.json({ message: "Agent Deleted" });
    } else {
      return res.json({ msg: "No agent found." });
    }
  } catch (ex) {
    return res.json(ex);
  }
}

export async function updateAgent(
  req: IMulterRequest,
  res: Response
): Promise<Response> {
  try {
    const { id } = req.params;
    const { name, lastname, password, email, company, phone } = req.body;
    const updatedAgent = await Agent.findByIdAndUpdate(id, {
      name,
      lastname,
      password,
      email,
      company,
      phone,
      imagePath: req.file.url
    });
    return res.json({
      message: "Successfully updated",
      updatedAgent
    });
  } catch (ex) {
    res.json(ex);
  }
}

export interface IMulterRequest extends Request {
  file: any;
}
