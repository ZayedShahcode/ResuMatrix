const { getGeminiResponse } = require('../utils/geminiService');

exports.compileCode = async (req, res, next) => {
  try {
    const { latexCode } = req.body;

    if (!latexCode) {
      return res.status(400).json({ message: 'No LaTeX code provided' });
    }

    // Example: Using Gemini API to compile or check code
    const response = await getGeminiResponse(latexCode, 'compile');

    res.status(200).json({ result: response });
  } catch (error) {
    next(error);
  }
};