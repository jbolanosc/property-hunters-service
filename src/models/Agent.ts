import { Schema, Document, model } from "mongoose";
const Agent = new Schema({
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
  },
  company: {
    type: String,
    required: true
  },
  postDate: {
    type: Date,
    default: Date.now
  }
});

export default model("image", Agent);
