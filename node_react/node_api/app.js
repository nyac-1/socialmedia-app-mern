const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

const postRoutes = require('./routes/post.js')
const authRoutes = require('./routes/auth.js')



dotenv.config()

mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("Successfully connected to the database")
});
mongoose.connection.on('error', (err)=>{
    console.log("ERROR: "+err);
})



const app = express();
app.use(expressValidator());

// const myOwnMiddleware = (req, res, next)=>{  
//     console.log("This is my own crap");
//     next();
// }

app.use(morgan('dev'));
app.use(bodyParser.json());


app.use("/",postRoutes);
app.use("/",authRoutes);



const port = process.env.PORT;
app.listen(port, ()=>{console.log("homie listeningg")})

