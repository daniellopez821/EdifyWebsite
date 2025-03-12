const express = require('express');
const multer = require('multer')
const cors = require('cors');
const app = express();

const port = 4200;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));


const upload = multer({dest: 'files/'})

app.get('/cart', function(req, res){
    res.end('Welcome to api');
});

app.post('/cart', upload.any(),function (req, res){
    
    console.log(req.body);
    console.log(req.files);
});

app.listen(4200);



