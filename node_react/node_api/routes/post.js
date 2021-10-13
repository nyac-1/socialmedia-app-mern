const express = require('express');
const postController = require('../controllers/post.js');
const authController = require('../controllers/auth.js');
const userController = require('../controllers/user.js');
const validator = require('../validator');


const router = express.Router();

router.get("/",authController.requireSignin,postController.getPosts);
router.post("/post",authController.requireSignin,validator.createPostValidator, postController.createPost);
router.param("userId", userController.userById);

module.exports = router;