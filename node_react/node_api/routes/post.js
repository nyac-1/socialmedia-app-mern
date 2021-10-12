const express = require('express');
const postController = require('../controllers/post.js');
const authController = require('../controllers/auth.js');
const validator = require('../validator');


const router = express.Router();

router.get("/",authController.requireSignin,postController.getPosts);
router.post("/post",authController.requireSignin,validator.createPostValidator, postController.createPost);


module.exports = router;