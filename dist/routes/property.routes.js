"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PropertyRouter = express_1.Router();
const property_controller_1 = require("../controllers/property.controller");
const imageConfig_1 = require("../libs/imageConfig");
// routes
PropertyRouter.route("/properties")
    .get(property_controller_1.getProperties)
    .post(imageConfig_1.parser.single("image"), property_controller_1.createProperty);
PropertyRouter.route("/property/:id")
    .get(property_controller_1.getProperty)
    .delete(property_controller_1.deleteProperty)
    .put(property_controller_1.updateProperty);
exports.default = PropertyRouter;
//# sourceMappingURL=property.routes.js.map