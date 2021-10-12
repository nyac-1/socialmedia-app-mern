const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/user.js');

dotenv.config()
const signup = async (req, res)=>{
    const userExists = await User.findOne({email: req.body.email});
    if(userExists){return res.status(400).json({error:"email taken"})};

    const user = await new User(req.body);
    await user.save((err,result)=>{
        if(err){
            console.log(err);
            return res.status(400).json({error:err});
        }
        console.log(result);
        return res.status(200).json({message: "Signup successful"});
    });
    
}

const signin = (req, res)=>{
    const {email, password} = req.body;
    const emailFound = User.findOne({email}, (err,user)=>{
        if(err || !user){
            return res.status(401).json({error: "Email not found"});
        }

        if(!user.authenticate(password)){
            return res.status(401).json({error: "Invalid credentials"});
        }
        
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);
        res.cookie("t", token, {expire: new Date() + 5000});
        
        const {email,_id,name} = user;
        return res.status(200).json({message:"Successfully signed in", cred:{name, _id, email}, token});
    });
}

const signout = (req, res)=>{
    res.clearCookie("t");
    return res.status(200).json({message:"Successfully signed out"});
}

module.exports = {
    signup,
    signin,
    signout,
}