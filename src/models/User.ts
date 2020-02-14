import { Schema, Document, model } from "mongoose";
const User = new Schema(
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
      type: String
    }
  },
  { timestamps: true }
);

export interface IUser extends Document {
  name: String;
  lastname: String;
  password: String;
  email: String;
  phone: String;
  imagePath: String;
}

export default model<IUser>("User", User);
