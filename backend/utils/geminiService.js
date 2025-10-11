import axios from "axios";

export const getGeminiResponse = async (latexCode, mode) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY not set in .env");

  const prompt =
    mode === "compile"
      ? `Compile this LaTeX code:\n${latexCode}`
      : `Optimize this LaTeX code:\n${latexCode}`;

  const response = await axios.post(
    "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateText",
    { prompt },
    { headers: { Authorization: `Bearer ${apiKey}` } }
  );

  return response.data;
};