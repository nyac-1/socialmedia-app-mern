const Post = require('../models/post');
// const formidable = require('formidable');

const getPosts = (req, res)=>{
    const posts = Post.find().then((posts)=>{   
        return res.status(200).json({posts: posts});
    }).catch(err => {
        return res.status(400).json({error: err});
    })
};

const createPost = (req, res, next)=>{
    /*let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req,(err,fields,files)=>{
        if(err){
            return res.status(400).json({error:"Image not uploaded"});
        }
        let post = new Post(fields);
        post.postedBy = req.profile;
        if(files.photo){
            post.photo.data = fs.readFileSync(files.photo.path);
            post.photo.contentType = files.photo.type;
        }
        post.save((err,result)=>{
            if(err){
                return res.status(400).json({error:err});
            }
            res.json({result});
        });
    })*/

    const post = new Post(req.body);
    post.postedBy = req.profile;

    post.save((err, result)=>{
        if(err){
            return res.status(400).json({error:err})
        }
        return res.status(200).json({post:result})
    })
};

module.exports = {
    getPosts,
    createPost
};