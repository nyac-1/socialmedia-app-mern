const express = require('express');
const postController = require('../controllers/post.js');
const authController = require('../controllers/auth.js');
const userController = require('../controllers/user.js');
const validator = require('../validator');


const router = express.Router();

router.get("/",authController.requireSignin,postController.getPosts);
router.get("/post/by/:userId",authController.requireSignin,postController.getPostsByUser);
router.post("/post/new/:userId",authController.requireSignin,validator.createPostValidator, postController.createPost);
router.put("/delete/:postId",authController.requireSignin, postController.isPoster,postController.deletePost);
router.put("/post/update/:postId",authController.requireSignin, postController.isPoster,postController.updatePost);

router.param("userId", userController.userById);
router.param("postId", postController.postById);


module.exports = router;