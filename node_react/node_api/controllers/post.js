const Post = require( '../models/post');
// const validator = require('../validator/index.js');

const getPosts = (req, res)=>{
    const posts = Post.find().then((posts)=>{   
        return res.status(200).json({posts: posts});
    }).catch(err => {
        return res.status(400).json({error: err});
    })
};

const createPost = (req, res)=>{
    const post = new Post(req.body);
    post.save((err, result)=>{return res.status(200).json({post:result})})
};

module.exports = {
    getPosts,
    createPost
};