const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const fs = require("fs");
const path = require('path');


const url = "mongodb+srv://Andy:cs20@cluster0.1aj3j.mongodb.net/stockticker?retryWrites=true&w=majority";  // connection string goes here

function main()
{
    router.get('/', function(req, res) {
        res.sendFile(path.join(__dirname+'/views/index.html'));
    });

    router.get('/about', function(req, res) {
        res.sendFile(path.join(__dirname+'/views/about.html'));
    });

    app.use('/', router);
    app.listen(process.env.port || 3000);
}

main();