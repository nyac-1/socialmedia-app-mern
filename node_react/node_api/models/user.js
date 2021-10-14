const mongoose = require('mongoose');
const uuidv1 = require('uuidv1');
var crypto = require('crypto');

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

    salt: {
        type: String
    },
    
    created:{
        type: Date,
        default: Date.now,
    },

    updated:{
        type: Date,
        default: Date.now
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

    authenticate: function(plaintext){
        return this.encryptPassword(plaintext) === this.hashed_password;
    },

    encryptPassword: function(password){
        if(!password){return "lol"}
        try{
            return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
        }
        catch(err){
            console.log(err);
            return "nope";
        }
    }
}


module.exports = mongoose.model("User", userSchema);