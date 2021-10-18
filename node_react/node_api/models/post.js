const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    title:{
        type: String,
        required: "Title is required",
        minlength: 4,
        maxlenght: 150
    },
    body:{
        type: String,
        required: "Body is required",
        minlength: 4,
        maxlenght: 2000
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    postedBy:{
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    created: {
        type: Date,
        default: Date.now,
    },
    updated: {
        type: Date,
    }
})

module.exports = mongoose.model("Post",postSchema);