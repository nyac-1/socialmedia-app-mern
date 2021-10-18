const Post = require('../models/post');
// const formidable = require('formidable');

const postById = (req, res, next, id)=>{
    Post.findById(id).exec((err,post)=>{
        if(err || !post){
            return res.status(400).json({error:"Post does not exist"})
        }
        req.post = post;
        next();
    });
};

const getPosts = (req, res)=>{
    const posts = Post.find()
    .populate('postedBy', 'name email')
    .then((posts)=>{   
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

const getPostsByUser = (req, res, next)=>{
    const posts = Post.find({postedBy: req.profile._id})
    .populate('postedBy', 'name email')
    .sort('created')
    .exec((err, posts)=>{   
        if(err){
            return res.status(400).json({error: err});
        }
        return res.status(200).json({posts: posts});
    })
}

const isPoster = (req, res, next)=>{
    let poster = (req.post.postedBy == req.auth._id);
    if(!poster){
        return res.status(400).json({error: "User not authorized", uid});
    }
    next();
}

const deletePost = (req, res, next)=>{
    var post = req.post;
    post.remove((err,post)=>{
        if(err){return res.status(400).json({error: err});}
        return res.json({post, message:"Delete confirmed"})
    });
}

module.exports = {
    getPosts,
    createPost,
    getPostsByUser,
    postById,
    deletePost,
    isPoster
};