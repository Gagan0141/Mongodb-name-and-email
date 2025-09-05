const express = require('express');
const router = express.Router();

router.use('/', require('./getRoutes'));
router.use('/', require('./postRoutes'));
router.use('/', require('./putRoutes'));
router.use('/', require('./patchRoutes'));
router.use('/', require('./deleteRoutes'));
router.use('/', require('./headRoutes'));
router.use('/', require('./optionsRoutes'));

module.exports = router;
