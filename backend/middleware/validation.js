import { body, validationResult } from 'express-validator';

/**
 * Middleware to check validation results and return errors
 */
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(err => ({
        field: err.path,
        message: err.msg
      }))
    });
  }
  next();
};

/**
 * Validation rules for /api/compile endpoint
 */
export const validateCompile = [
  body('code')
    .exists().withMessage('LaTeX code is required')
    .isString().withMessage('Code must be a string')
    .notEmpty().withMessage('Code cannot be empty')
    .isLength({ max: 50000 }).withMessage('Code is too large (max 50KB)')
    .custom((value) => {
      // Check for potentially dangerous LaTeX commands
      const dangerousCommands = [
        '\\write18',
        '\\immediate\\write',
        '\\input{/etc/',
        '\\include{/etc/',
        '\\openout',
        '\\openin',
        '\\read',
        '\\csname',
        '@@input',
        '\\catcode'
      ];
      
      const lowerValue = value.toLowerCase();
      for (const cmd of dangerousCommands) {
        if (lowerValue.includes(cmd.toLowerCase())) {
          throw new Error(`Potentially dangerous LaTeX command detected: ${cmd}`);
        }
      }
      return true;
    }),
  handleValidationErrors
];

/**
 * Validation rules for /api/optimize endpoint
 */
export const validateOptimize = [
  body('jobDescription')
    .exists().withMessage('Job description is required')
    .isString().withMessage('Job description must be a string')
    .notEmpty().withMessage('Job description cannot be empty')
    .isLength({ min: 10, max: 10000 }).withMessage('Job description must be between 10 and 10000 characters'),
  
  body('resumeLatex')
    .exists().withMessage('Resume LaTeX code is required')
    .isString().withMessage('Resume must be a string')
    .notEmpty().withMessage('Resume cannot be empty')
    .isLength({ max: 50000 }).withMessage('Resume is too large (max 50KB)'),
  
  handleValidationErrors
];

/**
 * Validation rules for /api/ats-score endpoint
 */
export const validateATSScore = [
  body('resumeText')
    .exists().withMessage('Resume text is required')
    .isString().withMessage('Resume text must be a string')
    .notEmpty().withMessage('Resume text cannot be empty')
    .isLength({ min: 1, max: 50000 }).withMessage('Resume text must be between 1 and 50000 characters'),
  
  body('jobDescription')
    .exists().withMessage('Job description is required')
    .isString().withMessage('Job description must be a string')
    .notEmpty().withMessage('Job description cannot be empty')
    .isLength({ min: 10, max: 10000 }).withMessage('Job description must be between 10 and 10000 characters'),
  
  handleValidationErrors
];
