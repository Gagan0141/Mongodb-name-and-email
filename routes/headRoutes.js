const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');

router.head('/', controller.headUsers);

module.exports = router;
