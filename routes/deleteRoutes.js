const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');

router.delete('/:id', controller.deleteUser);

module.exports = router;
