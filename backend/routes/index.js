import express from "express";
import compileRoutes from "./compileRoutes.js";
import optimizeRoutes from "./optimizeRoutes.js";

const router = express.Router();

router.use("/compile", compileRoutes);
router.use("/optimize", optimizeRoutes);

export default router;