const express = require('express');
const router = express.Router();

const compileRoutes = require('./compileRoutes');
const optimizeRoutes = require('./optimizeRoutes');

router.use('/compile', compileRoutes);
router.use('/optimize', optimizeRoutes);

module.exports = router;