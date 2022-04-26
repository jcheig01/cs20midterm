const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const path = require('path');
const request = require('request'); 


const url = "mongodb+srv://Andy:cs20@cluster0.1aj3j.mongodb.net/moonshoes?retryWrites=true&w=majority";  // connection string goes here

function main()
{
    var recommend;

    app.use(bodyParser.urlencoded(
        { extended: true })); 
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');

    app.get('/', function(req, res) {
        res.render('index');
    });

    app.post('/', function(req, res) {
        var latitude;
        var longitude;

        console.log(req.body);
        if (req.body.latitude && req.body.latitude) {
            latitude = req.body.latitude;
            longitude = req.body.longitude;
        } else {
            console.log("latitude not found");
        }

        var API_KEY = 'b8c0e6f2d0bfa0d70e82c0d934973f63'; 
        
        const forecast = function (latitude, longitude) { 
        
            var url = `http://api.openweathermap.org/data/2.5/weather?`
                        +`lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
        
            request({ url: url, json: true }, function (error, response) { 
                if (error) { 
                    console.log('Unable to connect to Forecast API'); 
                } 
                else { 
                    if (parseFloat(response.body.main.temp) > 280) { 
                        recommend = "summer";
                    } else {
                        recommend = "winter";
                    }
                } 
            }) 
        }

        forecast(latitude, longitude); 
    });

    app.get('/index', function(req, res) {
        res.render('index');
    });

    app.get('/about', function(req, res) {
        res.render('about');
    });

    app.get('/location', function(req, res) {
        res.render('location');
    });

    app.get('/mens', function(req, res) {
        MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
            if (err) { return console.log(err); }
            
            var dbo = db.db("moonshoes");
            var collection = dbo.collection('mens');
            collection.find().toArray().then(function(arr) {console.log(arr); res.render('mens', {query: arr});});
        });

    });

    app.get('/womens', function(req, res) {
        MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
            if (err) { return console.log(err); }
            
            var dbo = db.db("moonshoes");
            var collection = dbo.collection('womens');
            collection.find().toArray().then(function(arr) {console.log(arr); res.render('womens', {query: arr});});
        });

        res.render('womens');
    });

    app.get('/recommend', function(req, res) {

        if (recommend == "winter") {
            MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
                if (err) { return console.log(err); }
                
                var dbo = db.db("moonshoes");
                var collection = dbo.collection('mens');
                collection.find({weather:"winter"}).toArray().then(function(arr) {console.log(arr)});
            });
            res.render('recommend');
        } else if (recommend == "summer") {
            MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
                if (err) { return console.log(err); }
                
                var dbo = db.db("moonshoes");
                var collection = dbo.collection('mens');
                collection.find({weather:"summer"}).toArray().then(function(arr) {console.log(arr)});
            });
            res.render('recommend');
        } else {
            res.render('index');
        }
    });

    app.get('/contact', function(req, res) {
        res.render('contact');
    });

    app.get('/faq', function(req, res) {
        res.render('faq');
    });

    app.get('/login', function(req, res) {
        res.render('login');
    });

    app.listen(process.env.port || 3000);
}

main();