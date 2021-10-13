const express = require('express');
const authController = require('../controllers/auth.js');
const validator = require('../validator');
const userController = require('../controllers/user.js');

const router = express.Router();

router.post("/signup",validator.signupValidator,authController.signup);
router.post("/signin",authController.signin);
router.get("/signout",authController.signout);

router.param("userId", userController.userById);


module.exports = router;