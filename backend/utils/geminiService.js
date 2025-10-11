import { GoogleGenerativeAI } from "@google/generative-ai";


export const getGeminiResponse = async (latexCode) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY not set in .env");
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  // Good prompt is necessary to get good output from the LLM.
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
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    let optimizedLatex = result.response.text().replaceAll("```","");
    optimizedLatex = optimizedLatex.replace("latex","");

    return optimizedLatex;
  } catch (err) {
    console.error(err);
    res.status(500).send("Error optimizing resume");
  }
};
