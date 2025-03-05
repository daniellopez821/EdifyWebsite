import mysql from 'mysql2'

const express = require('express');
const port = process.env.PORT || 3360;

const app = express();

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'Felipe02102*',
    database: 'edify_website'
}).promise()

//API MiddleWare

app.use(express.json()); // this is to accept data in json format

app.use(express.urlencoded()); //Used to decode data send through html form

//API Routes
app.get('/add',(req,res)=>{

    res.sendFile(_dirname + '/edify/src/app/cart-page/cart-page.component.html');
})


app.post('/add',(req,res)=>{
    console.log(req.body); // the data we get is in the body of the request
})


app.listen(port,()=>{
    console.log(`Server started at http://localhost:${port}`)
});

