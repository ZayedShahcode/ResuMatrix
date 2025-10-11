import { getGeminiResponse } from "../utils/geminiService.js";

export const optimizeCode = async (req, res, next) => {
  try {
    const { latexCode } = req.body;
    if (!latexCode) return res.status(400).json({ message: "No LaTeX code provided" });

    const response = await getGeminiResponse(latexCode, "optimize");
    res.status(200).json({ result: response });
  } catch (err) {
    next(err);
  }
};