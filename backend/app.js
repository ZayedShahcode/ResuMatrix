import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routeIndex from "./routes/index.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";

dotenv.config();

const app = express();

app.use(express.json({ limit: "5mb" }));
app.use(cors("*"));

// Routes
app.use("/api", routeIndex);

// Error handling
app.use(errorHandler);

export default app;