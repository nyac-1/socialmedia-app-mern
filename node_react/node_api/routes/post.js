const express = require('express');
const postController = require('../controllers/post.js');
// const validator = require('../validator/index.js');


const router = express.Router();

router.get("/",postController.getPosts);
router.post("/post", postController.createPost);
//validator.createPostValidator

module.exports = router;