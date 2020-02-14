"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Property = new mongoose_1.Schema({
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
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Images"
    },
    propertyType: {
        type: String,
        required: true
    },
    seller: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });
exports.default = mongoose_1.model("Property", Property);
//# sourceMappingURL=Property.js.map