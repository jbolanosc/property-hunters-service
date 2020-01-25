import express, { Application } from "express";
import morgan from "morgan";
import path from "path";
import cors from "cors";

import indexRoutes from "./routes/index";

//App initialization
const app: Application = express();

//Settings
app.set("port", process.env.PORT || 4000);

//Middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", indexRoutes);
app.use(function(req, res, next) {
  return res.status(404).send({ message: "Route" + req.url + " Not found." });
});
app.use(function(err, req, res, next) {
  return res.status(500).send({ error: err });
});

export default app;
