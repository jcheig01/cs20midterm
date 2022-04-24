const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const fs = require("fs");
const path = require('path');


const url = "mongodb+srv://Andy:cs20@cluster0.1aj3j.mongodb.net/moonshoes?retryWrites=true&w=majority";  // connection string goes here

function main()
{
    router.get('/', function(req, res) {
        res.sendFile(path.join(__dirname+'/views/index.html'));
    });

    router.get('/index.html', function(req, res) {
        res.sendFile(path.join(__dirname+'/views/index.html'));
    });

    router.get('/about.html', function(req, res) {
        res.sendFile(path.join(__dirname+'/views/about.html'));
    });

    router.get('/location.html', function(req, res) {
        res.sendFile(path.join(__dirname+'/views/location.html'));
    });

    router.get('/mens.html', function(req, res) {
        res.sendFile(path.join(__dirname+'/views/mens.html'));
        MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
            if (err) { return console.log(err); }
            
            var dbo = db.db("moonshoes");
            var collection = dbo.collection('mens');
            collection.find().toArray().then(function(arr) {console.log(arr)});
        });
    });

    router.get('/womens.html', function(req, res) {
        res.sendFile(path.join(__dirname+'/views/womens.html'));
        MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
            if (err) { return console.log(err); }
            
            var dbo = db.db("moonshoes");
            var collection = dbo.collection('womens');
            collection.find().toArray().then(function(arr) {console.log(arr)});
        });
    });

    router.get('/contact.html', function(req, res) {
        res.sendFile(path.join(__dirname+'/views/contact.html'));
    });

    router.get('/faq.html', function(req, res) {
        res.sendFile(path.join(__dirname+'/views/faq.html'));
    });

    router.get('/login.html', function(req, res) {
        res.sendFile(path.join(__dirname+'/views/login.html'));
    });

    app.use('/', router);
    app.listen(process.env.port || 3000);
}

main();