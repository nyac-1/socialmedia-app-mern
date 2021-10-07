const Post = require( '../models/post');

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
    post.save((err, result)=>{
        if(err){
            return res.status(400).json({
                error: err
            });
        }
        res.status(200).json({post:result})
    })

    // console.log("Creating a new post ", req.body);
};

module.exports = {
    getPosts,
    createPost
};