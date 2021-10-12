const User = require('../models/user.js');

const signup = async (req, res)=>{
    const userExists = await User.findOne({email: req.body.email});
    if(userExists ){return res.status(400).json({error:"email taken"})};

    const user = await new User(req.body);
    await user.save((err,result)=>{
        if(err){
            console.log(err);
            return res.status(400).json({error:err});
        }
        console.log(result);
        return res.status(200).json({user});
    });
    
}

module.exports = {
    signup,
}