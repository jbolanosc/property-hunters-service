"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Property_1 = __importDefault(require("../models/Property"));
async function getProperties(req, res) {
    try {
        const properties = await Property_1.default.find();
        return res.json(properties).status(200);
    }
    catch (ex) {
        return res.json(ex).status(500);
    }
}
exports.getProperties = getProperties;
async function createProperty(req, res) {
    try {
        const { name, mapCoords, beds, baths, address, constructionSize, lotSize, description, parking, price, seller, propertyType } = req.body;
        const newProperty = {
            name,
            mapCoords,
            beds,
            baths,
            address,
            constructionSize,
            lotSize,
            description,
            parking,
            price,
            seller,
            propertyType,
            imagePath: req.file.url || ""
        };
        const property = new Property_1.default(newProperty);
        await property.save();
        return res
            .json({
            message: "Property Saved Successfully",
            property
        })
            .status(200);
    }
    catch (ex) {
        return res.json(ex).status(500);
    }
}
exports.createProperty = createProperty;
async function getProperty(req, res) {
    const { id } = req.params;
    const property = await Property_1.default.findById(id);
    if (property) {
        return res.json(property).status(200);
    }
    else {
        return res.json({ msg: "No property found." }).status(400);
    }
}
exports.getProperty = getProperty;
async function deleteProperty(req, res) {
    try {
        const { id } = req.params;
        const property = await Property_1.default.findByIdAndRemove(id);
        if (property) {
            return res.json({ message: "Property Deleted" }).status(200);
        }
        else {
            return res.json({ msg: "No Property found." }).status(400);
        }
    }
    catch (ex) {
        return res.json(ex).status(500);
    }
}
exports.deleteProperty = deleteProperty;
async function updateProperty(req, res) {
    try {
        const { id } = req.params;
        const { name, mapCoords, beds, baths, address, constructionSize, lotSize, description, parking, price, seller, propertyType } = req.body;
        const updatedProperty = await Property_1.default.findByIdAndUpdate(id, {
            name,
            mapCoords,
            beds,
            baths,
            address,
            constructionSize,
            lotSize,
            description,
            parking,
            price,
            seller,
            propertyType,
            imagePath: req.file.url
        });
        return res
            .json({
            message: "Successfully updated",
            updatedProperty
        })
            .status(200);
    }
    catch (ex) {
        res.json(ex).status(500);
    }
}
exports.updateProperty = updateProperty;
//# sourceMappingURL=property.controller.js.map