const User = require('../models/user.js');
const _ = require('lodash');

const userById = (req, res, next, id)=>{
    User.findById(id).exec((err, user)=>{
        if(err || !user){
            return res.status(400).json({error:"User does not exist"})
        }
        req.profile = user;
        next();
    });
};

const hasAuthorization = (req, res, next)=>{
    const authorized = req.profile && req.auth &&req.profile._id === req.auth._id;
    if(!authorized){
        return res.status(403).json({error:"User not authorized"})
    }
    next();
}

const allUsers = (req, res, next)=>{
    User.find((err, users)=>{
        if(err){
            return res.status(400).json({error:"Error"})
        }
        return res.status(200).json({users})
    });
};

const getUser = (req, res, next)=>{
    const {name, email, created} = req.profile;
    return res.json({name, email, created});
};

const updateUser =(req, res, next)=>{
    var user = req.profile;
    user = _.extend(user, req.body);
    user.updated = Date.now();

    user.save(err=>{
        if(err){
            return res.status(400).json({error:"Update error"});
        }
        return res.status(200).json({user});
    })
}

const deleteUser = (req, res, next)=>{
    var user = req.profile;
    user.remove((err,user)=>{
        if(err){return res.status(400).json({err});}
        return res.json({user, message:"Delete confirmed"})
    });
};

module.exports = {
    userById,
    hasAuthorization,
    allUsers,
    getUser,
    updateUser,
    deleteUser
};