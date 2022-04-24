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

    router.get('/location', function(req, res) {
        res.sendFile(path.join(__dirname+'/views/location.html'));
    });

    router.get('/mens', function(req, res) {
        res.sendFile(path.join(__dirname+'/views/mens.html'));
    });

    router.get('/womens', function(req, res) {
        res.sendFile(path.join(__dirname+'/views/womens.html'));
    });

    router.get('/contact', function(req, res) {
        res.sendFile(path.join(__dirname+'/views/contact.html'));
    });

    router.get('/faq', function(req, res) {
        res.sendFile(path.join(__dirname+'/views/faq.html'));
    });

    router.get('/login', function(req, res) {
        res.sendFile(path.join(__dirname+'/views/login.html'));
    });

    app.use('/', router);
    app.listen(process.env.port || 3000);
}

main();