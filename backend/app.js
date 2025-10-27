import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { exec } from "child_process";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { clearFolder } from "./utils/clearFolder.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { calculateATSScore } from "./utils/atsScoring.js";

// Import middleware
import { validateCompile, validateOptimize, validateATSScore } from "./middleware/validation.js";
import {
    compileRateLimiter,
    optimizeRateLimiter,
    generalRateLimiter,
} from "./middleware/rateLimiter.js";
import {
    errorHandler,
    notFoundHandler,
    asyncHandler,
} from "./middleware/errorHandler.js";

const app = express();
dotenv.config();

// Validate required environment variables
if (!process.env.GEMINI_API_KEY) {
    console.error("ERROR: GEMINI_API_KEY is not set in environment variables");
    console.error(
        "Please create a .env file in the backend directory with GEMINI_API_KEY=your_api_key_here"
    );
    process.exit(1);
}

// Middleware
app.use(express.json({ limit: "5mb" }));
app.use(
    cors({
        origin: process.env.FRONTEND_URL || "http://localhost:5173",
        credentials: true,
    })
);

// Apply general rate limiting to all routes
app.use(generalRateLimiter);

// Get current directory in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const tmpDir = path.join(__dirname, "tmp");

// Ensure tmp directory exists
if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir, { recursive: true });
    console.log(`Created tmp directory at: ${tmpDir}`);
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Health check endpoint
app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "ResuMatrix API is running",
        timestamp: new Date().toISOString(),
    });
});

// ----------------------- Compile LaTeX -----------------------
app.post(
    "/api/compile",
    compileRateLimiter,
    validateCompile,
    asyncHandler(async (req, res) => {
        const tex = req.body.code;
        const texPath = path.join(tmpDir, "resume.tex");
        const pdfPath = path.join(tmpDir, "resume.pdf");

        fs.writeFileSync(texPath, tex);

        const command = `pdflatex -interaction=nonstopmode -output-directory=${tmpDir} ${texPath}`;

        exec(command, async (err, stdout, stderr) => {
            console.log("LaTeX log:\n", stdout);

            if (fs.existsSync(pdfPath)) {
                const pdf = fs.readFileSync(pdfPath);
                await clearFolder(tmpDir);
                res.contentType("application/pdf");
                res.send(pdf);
            } else {
                res.status(500).json({
                    success: false,
                    message: "LaTeX compilation failed",
                    error: stderr || stdout || err?.message,
                });
            }
        });
    })
);

// ----------------------- Optimize Resume -----------------------
app.post(
    "/api/optimize",
    optimizeRateLimiter,
    validateOptimize,
    asyncHandler(async (req, res) => {
        const { jobDescription, resumeLatex } = req.body;

        const prompt = `
    You are an expert in ATS resume optimization.

Follow these STRICT rules to update the user's LaTeX resume using the job description:

- Return ONLY the revised LaTeX code. Output nothing else.
- DO NOT exceed one page. If the resume is too long, first trim or shorten bullet points in Achievements, Certifications, and Projects, using fewer words or synonyms (ATS OPTIMIZED) until it fits. Never remove or alter project or section names.
- DO NOT add new sections, personal information, images, icons, graphics, tables, fonts, or colors. Keep everything black and white.
- ONLY modify existing content to add or emphasize relevant, *truthful* keywords and skills from the job description. Do NOT invent or exaggerate experience.
- NEVER change or rename any project titles, work experiences, or education items. Only minor section titles (e.g. “Achievements” to “Awards”) may be renamed for ATS if relevant.
- KEEP the original structure, order, and formatting. Do NOT alter font size, font family, or margins.
- DO NOT add bold or italic formatting to individual skills in Technical Skills. Only section headings like Technologies or Languages may use \textbf{}.
- For bullet points, rewrite only to better align with the job description, incorporate relevant keywords honestly, and increase ATS score—without adding unsupported content.
- Resume must compile and remain strictly within a single page at all times.
- ZERO commentary, explanation, or extra text—ONLY the final, optimized LaTeX code.

Input:

Job Description:
${jobDescription}

User Resume LaTeX:
${resumeLatex}

`;

        try {
            const model = genAI.getGenerativeModel({
                model: "gemini-2.5-flash",
            });
            const result = await model.generateContent(prompt);
            let optimizedLatex = result.response.text().replaceAll("```", "");
            optimizedLatex = optimizedLatex.replace("latex", "");

            res.json({
                success: true,
                optimizedLatex,
            });
        } catch (err) {
            console.error("AI Optimization Error:", err);
            throw new Error(
                "Failed to optimize resume. Please try again later."
            );
        }
    })
);

// ATS Score endpoint
app.post(
    "/api/ats-score",
    generalRateLimiter,
    validateATSScore,
    asyncHandler(async (req, res) => {
        try {
            console.log("Received ATS score request:", req.body);
            const { resumeText, jobDescription } = req.body;

            console.log("Calculating ATS score...");
            const result = calculateATSScore(resumeText, jobDescription);
            console.log("ATS score result:", result);

            if (!result || typeof result.score !== "number") {
                console.error("Invalid result from calculateATSScore:", result);
                return res.status(500).json({
                    success: false,
                    message: "Failed to calculate ATS score",
                });
            }

            return res.json({
                success: true,
                score: result.score,
                keywords: result.matchedKeywords,
            });
        } catch (error) {
            console.error("Error in ATS score endpoint:", error);
            return res.status(500).json({
                success: false,
                message: error.message || "Failed to calculate ATS score",
            });
        }
    })
);

// 404 handler for undefined routes
app.use(notFoundHandler);

// Error handling middleware (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✓ Server running on port ${PORT}`);
    console.log(`✓ Environment: ${process.env.NODE_ENV || "development"}`);
    console.log(
        `✓ CORS origin: ${process.env.FRONTEND_URL || "http://localhost:5173"}`
    );
});
