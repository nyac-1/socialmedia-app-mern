const express = require('express');
const authController = require('../controllers/auth.js');
const validator = require('../validator');

const router = express.Router();

router.post("/signup",validator.signupValidator,authController.signup);

module.exports = router;