const express = require('express');

let app=express();
const helmet = require('helmet');
app.use(helmet());

// reminder...middleware is anything that has access to rec and res
// app.get('/',(req,res,next)=>{
//     res.send("sanity check");
// })

const mysql = require('mysql');
const config = require('./config');
let connection = mysql.createConnection(config.db);
connection.connect();

app.set('views','views');
app.set('view engine','ejs');

app.use(express.static('public'));

app.get('/',(req,res,next)=>{
    const animalQuery = `select * from animals`
    connection.query(animalQuery, (error, results)=>{
        if(error){throw error}
        const rand = Math.floor(Math.random()*results.length)
        res.render('index',{animals:results[rand]});
    });
})

app.get('/vote/:value/:id',(req,res)=>{
    const value = req.params.value;
    const id = req.params.id;
    const insertQuery = `INSERT INTO votes(id, aid, value)
    VALUES
    (DEFAULT, ?, ?)`
    connection.query(insertQuery,[id,value],(error,results)=>{
        if (error){throw error;}
        res.redirect('/');
    })
})

console.log('app is listening on port 8282');
app.listen(8282);