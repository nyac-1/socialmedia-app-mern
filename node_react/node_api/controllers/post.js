const Post = require( '../models/post');
// const validator = require('../validator/index.js');

const getPosts = (req, res)=>{
    res.json({
        posts: [
            {title: "First Post"},
            {title: "Second Post"}
        ]
    });
};

const createPost = (req, res)=>{
    const post = new Post(req.body);
    post.save((err, result)=>{return res.status(200).json({post:result})})
};

module.exports = {
    getPosts,
    createPost
};