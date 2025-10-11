import { exec } from "child_process";
import path from "path";
import fs from "fs";
import { clearFolder } from "../utils/clearFolder.js";

// Path to store temporary files
const TEMP_DIR = path.join(process.cwd(), "temp");

const compileLatexLocally = (latexCode) => {
  return new Promise((resolve, reject) => {
    const timestamp = Date.now();
    const texFile = path.join(TEMP_DIR, `resume_${timestamp}.tex`);
    const pdfFile = path.join(TEMP_DIR, `resume_${timestamp}.pdf`);

    // Ensure TEMP_DIR exists
    if (!fs.existsSync(TEMP_DIR)) fs.mkdirSync(TEMP_DIR, { recursive: true });

    // Write LaTeX code to .tex file
    fs.writeFileSync(texFile, latexCode, "utf8");

    // Compile using MikTeX (pdflatex)
    exec(`pdflatex -output-directory=${TEMP_DIR} ${texFile}`, (error, stdout, stderr) => {
      if (error) return reject(error);

      if (!fs.existsSync(pdfFile)) {
        return reject(new Error("PDF was not generated."));
      }

      // Read PDF as Buffer
      const pdfBuffer = fs.readFileSync(pdfFile);

      // Optional: clear temp folder after compilation
      clearFolder(TEMP_DIR);

      resolve(pdfBuffer);
    });
  });
};

export const compileCode = async (req, res, next) => {
  try {
    const { latexCode } = req.body;

    if (!latexCode) {
      return res.status(400).json({ message: "No LaTeX code provided" });
    }

    const pdfBuffer = await compileLatexLocally(latexCode);

    res.status(200).json({ result: pdfBuffer.toString("base64") }); // Send PDF as base64
  } catch (err) {
    next(err);
  }
};