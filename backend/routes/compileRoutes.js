import express from "express";
import { compileCode } from "../controllers/compileController.js";

const router = express.Router();
router.post("/", compileCode);

export default router;