import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import routeIndex from "./routes/index.js";

dotenv.config();

const app = express();

app.use(express.json({ limit: "5mb" }));
app.use(cors("*"));

// API Routes
app.use("/api", routeIndex);

// Error Handler Middleware
app.use(errorHandler);

export default app;