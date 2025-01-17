import { Schema, Document, model } from "mongoose";
const Agent = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    imagePath: {
      type: String,
      required: true
    },
    company: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

export interface IAgent extends Document {
  name: String;
  lastname: String;
  password: String;
  email: String;
  phone: String;
  imagePath: String;
  company: String;
}

export default model<IAgent>("images", Agent);
