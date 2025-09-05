const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');

router.patch('/:id', controller.updateUser);

module.exports = router;
