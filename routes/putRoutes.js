const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');

router.put('/:id', controller.replaceUser);

module.exports = router;
