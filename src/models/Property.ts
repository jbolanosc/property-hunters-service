import { Schema, Document, model } from "mongoose";
const Property = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    imagePath: {
      type: String,
      required: true
    },
    mapCoords: {
      type: Array
    },
    beds: {
      type: Number
    },
    baths: {
      type: Number
    },
    address: {
      type: String,
      required: true
    },
    constructionSize: {
      type: Number
    },
    lotSize: {
      type: Number,
      required: true
    },
    views: {
      type: Number
    },
    saved: {
      type: Number
    },
    description: {
      type: String,
      required: true
    },
    parking: {
      type: Number
    },
    price: {
      type: Number,
      required: true
    },
    Agent: {
      type: Schema.Types.ObjectId,
      ref: "Images"
    },
    propertyType: {
      type: String,
      required: true
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

export default model("Property", Property);
