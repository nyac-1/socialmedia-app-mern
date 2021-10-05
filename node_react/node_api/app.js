const postRoutes = require('./routes/post.js');
const express = require('express');
const morgan = require('morgan');
const app = express();

const myOwnMiddleware = (req, res, next)=>{  
    console.log("This is my own crap");
    next();
}

app.use(morgan('dev'));
// app.use(myOwnMiddleware);

app.get("/",myOwnMiddleware,postRoutes.getPosts);

const port = 3000;
app.listen(port, ()=>{console.log("homie listeningg")})

