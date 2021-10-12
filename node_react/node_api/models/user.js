const mongoose = require('mongoose');
const uuidv1 = require('uuidv1');
const { createHmac } = import('crypto');



const userSchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: true
    },

    email:{
        type: String,
        trim: true,
        required: true
    },
    hashed_password:{
        type: String,
        trim: true
    },

    salt: String,
    
    created:{
        type: Date,
        default: Date.now,
    }
});

userSchema.virtual("password")
.set(function(password){
    this._password = password;
    this.salt = uuidv1();
    this.hashed_password = this.encryptPassword(password);
})
.get(function(password){
    return this._password;
})

userSchema.methods = {
    encryptPassword: function(password){
        if(!password){return ""}
        try{
            return createHmac('sha1', salt).update(password).digest('hex');
        }
        catch(err){
            return ""
        }
    }
}




module.exports = mongoose.model("User", userSchema);