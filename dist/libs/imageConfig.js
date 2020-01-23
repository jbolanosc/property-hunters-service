"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const multer = require("multer");
cloudinary.config({
    cloud_name: process.env.C_NAME,
    api_key: process.env.C_KEY,
    api_secret: process.env.API_SECRET
});
const storage = cloudinaryStorage({
    cloudinary,
    folder: "PropertyHunters/Agents",
    allowedFormats: ["jpg", "png"],
    transformation: [{ width: 500, height: 500, crop: "limit" }]
});
exports.parser = multer({ storage });
//# sourceMappingURL=imageConfig.js.map