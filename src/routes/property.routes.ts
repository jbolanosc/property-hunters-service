import { Router } from "express";
const PropertyRouter = Router();

import {
  getProperties,
  createProperty,
  getProperty,
  deleteProperty,
  updateProperty
} from "../controllers/property.controller";
import { parser } from "../libs/imageConfig";

// routes
PropertyRouter.route("/properties")
  .get(getProperties)
  .post(parser.single("image"), createProperty);

PropertyRouter.route("/property/:id")
  .get(getProperty)
  .delete(deleteProperty)
  .put(updateProperty);

export default PropertyRouter;
