import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import dotenv from "dotenv";

const PORT = process.env.PORT || 3000;
export var appPath = __dirname;

import api from "./api";

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

app.use("/api", api);

export default app;
