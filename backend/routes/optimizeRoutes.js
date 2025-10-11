import express from "express";
import { optimizeCode } from "../controllers/optimizeController.js";

const router = express.Router();
router.post("/", optimizeCode);

export default router;