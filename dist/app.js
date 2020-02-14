"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const index_1 = __importDefault(require("./routes/index"));
//App initialization
const app = express_1.default();
//Settings
app.set("port", process.env.PORT || 4000);
//Middlewares
app.use(morgan_1.default("dev"));
app.use(cookie_parser_1.default());
app.use(cors_1.default());
app.use(express_1.default.json());
// Routes
app.use("/api", index_1.default);
app.use(function (req, res, next) {
    return res.status(404).send({ message: "Route" + req.url + " Not found." });
});
app.use(function (err, req, res, next) {
    return res.status(500).send({ error: err });
});
exports.default = app;
//# sourceMappingURL=app.js.map