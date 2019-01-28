const express = require('express');

let app=express();
const helmet = require('helmet');
app.use(helmet());

// reminder...middleware is anything that has access to rec and res
app.get('/',(req,res,next)=>{
    res.send("sanity check");
})

const mysql = require('mysql');
const config = require('./config');
let connection = mysql.createConnection(config.db);
connection.connect();

app.set('views','views');
app.set('view engine','ejs');

app.use(express.static('public'));

app.get('/',(req,res,next)=>{
    res.render('index',{});
})

console.log('app is listening on port 8282');
app.listen(8282);