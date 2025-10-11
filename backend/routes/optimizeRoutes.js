const express = require('express');
const router = express.Router();
const { optimizeCode } = require('../controllers/optimizeController');

// POST /api/optimize
router.post('/', optimizeCode);

module.exports = router;