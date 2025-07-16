import express, { Application, NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import routes from "./modules/routes";
import { ZodError } from "zod";
import mongoose from "mongoose";
import { TErrorSources, TErrorSourcesResponse } from "./interfaces/error";
import globalErrorHandler from "./middleware/globalErrorHandler";

const app: Application = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api", routes);

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running");
});

app.use(globalErrorHandler);

export default app;
