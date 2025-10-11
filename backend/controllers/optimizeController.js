const { getGeminiResponse } = require('../utils/geminiService');

exports.optimizeCode = async (req, res, next) => {
  try {
    const { latexCode } = req.body;

    if (!latexCode) {
      return res.status(400).json({ message: 'No LaTeX code provided' });
    }

    const response = await getGeminiResponse(latexCode, 'optimize');

    res.status(200).json({ result: response });
  } catch (error) {
    next(error);
  }
};