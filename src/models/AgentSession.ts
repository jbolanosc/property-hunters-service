import { Schema, Document, model } from "mongoose";
import uuid from "uuid";
const AgentSession = new Schema(
  {
    id: {
      type: String,
      default: () => uuid.v4()
    },
    agentId: {
      type: String,
      required: true
    },
    expiresAt: {
      type: Date,
      required: true
    }
  },
  { timestamps: true }
);

export interface IAgentSession extends Document {
  id: String;
  agentId: String;
  expiresAt: String;
}

export default model<IAgentSession>(
  "AgentSession",
  AgentSession,
  "AgentSessions"
);
