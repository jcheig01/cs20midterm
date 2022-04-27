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
    app.use(express.static(path.join(__dirname + '/views')));

    app.set('view engine', 'ejs');

    app.get('/', function(req, res) {
        res.render('index');
    });

    app.post('/', function(req, res) {

        if (req.body.latitude && req.body.latitude) {
            var latitude = req.body.latitude;
            var longitude = req.body.longitude;

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
        } else if (req.body.name && req.body.price) {
            var n;
            var p;
    
            console.log("CART ADDED!!!!");
    
            console.log(req.body);
            if (req.body.name && req.body.price) {
                n = req.body.name;
                p = req.body.price;
            } else {
                console.log("name not found");
            }
    
            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbo = db.db("moonshoes");
                var myobj = { name: n, price: p };
                dbo.collection("cart").insertOne(myobj, function(err, res) {
                  if (err) throw err;
                  console.log("1 item inserted");
                  db.close();
                });
              });
        } else {
            console.log("location not found");
        }
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
            var collection = dbo.collection('shoes');
            collection.find({gender:"Mens"}).toArray().then(function(arr) {res.render('mens', {query: arr});});
        });

    });

    app.get('/womens', function(req, res) {
        MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
            if (err) { return console.log(err); }
            
            var dbo = db.db("moonshoes");
            var collection = dbo.collection('shoes');
            collection.find({gender:"Womens"}).toArray().then(function(arr) {res.render('womens', {query: arr});});
        });
    });

    app.get('/recommend', function(req, res) {

        if (recommend == "winter") {
            MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
                if (err) { return console.log(err); }
                
                var dbo = db.db("moonshoes");
                var collection = dbo.collection('shoes');
                collection.find({weather:"winter"}).toArray().then(function(arr) {res.render('recommend', {query: arr});});
            });
        } else if (recommend == "summer") {
            MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
                if (err) { return console.log(err); }
                
                var dbo = db.db("moonshoes");
                var collection = dbo.collection('shoes');
                collection.find({weather:"summer"}).toArray().then(function(arr) {res.render('recommend', {query: arr});});
            });
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
    
    app.get('/creditcard', function(req, res) {
        MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
            if (err) { return console.log(err); }
            
            var dbo = db.db("moonshoes");
            var collection = dbo.collection('cart');
            collection.find().toArray().then(function(arr) {res.render('creditcard', {query: arr});});
        });
    });

    app.listen(process.env.port || 3000);
}

main();
