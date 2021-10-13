const User = require('../models/user.js')

const userById = (req, res, next, id)=>{
    User.findById(id).exec((err, user)=>{
        if(err){
            return res.status(400).json({error:"User does not exist"})
        }
        req.profile = user;
        next();
    })
}

const hasAuthorization = (req, res, next)=>{
    const authorized = req.profile && req.auth &&req.profile._id === req.auth_id 
    if(!authorized){
        return res.status(403).json({error:"User not authorized"})
    }
    next();
}

module.exports = {
    userById,
    hasAuthorization,
    
};