const express = require('express');
const router = express.Router();
const { compileCode } = require('../controllers/compileController');

// POST /api/compile
router.post('/', compileCode);

module.exports = router;