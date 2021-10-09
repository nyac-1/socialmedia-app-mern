const mongoose = require('mongoose');

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
        trim: true,
        required: true
    },

    salt: String,
    
    created:{
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model("User", userSchema);