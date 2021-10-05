const helpers = require('./helpers.js');
const express = require('express');
// const {sum} = require('./helpers.js');
const http = require('http');

const app = express();

app.get('/',(req, res)=>{
    res.send("how are you ?");

})

app.listen(3000);

// const server = http.createServer((req, res)=>{
//     res.end("Hey dude how yu doing");
// })

// server.listen(3000);

var totes = helpers.sum(10,20);
console.log(totes);

