const express = require('express');
const userController = require('../controllers/user.js');
const authController = require('../controllers/auth.js');

const router = express.Router();

router.get("/users",authController.requireSignin,userController.allUsers);
router.get("/user/:userId", authController.requireSignin,userController.getUser);
router.put("/user/:userId", userController.hasAuthorization, authController.requireSignin, userController.updateUser);
router.param("userId", userController.userById);

module.exports = router;