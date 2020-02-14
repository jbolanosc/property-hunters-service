import { Schema, Document, model } from "mongoose";
import uuid from "uuid";
const Session = new Schema(
  {
    id: {
      type: String,
      default: () => uuid.v4()
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    expiresAt: {
      type: Date,
      required: true
    }
  },
  { timestamps: true }
);

export interface ISession extends Document {
  id: String;
  userId: String;
  expiresAt: String;
}

export default model("Session", Session);
