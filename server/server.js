var express = require('express');
var app = express();
var request = require('request');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var Q = require('q');
var jwt = require('jwt-simple');
var secret = 'hackReactorThesisProjectJwtTokenSecret';
var massive = require('massive');
var helpers = require('./config/helpers');
var connectionString = 'postgres://:@localhost/citizen'

var db = massive.connectSync({connectionString: connectionString});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.post('/index', function(req, res) {
  console.log("SFAPI was queried with: ",req.body.data);
  var queryInfo = req.body.data;
  var options = {
    url: 'https://congress.api.sunlightfoundation.com/bills/search?query=' + queryInfo + '&active=true',
    headers: {
      'X-APIKEY': '6895f8ab90944228b8c8ea226ebdcfa1' 
    }
  }
  request(options, function(err, response) {
    if (err) { console.log("YO, THERE WAS AN ERROR!: ", err) }
    res.status(200).send(response);
  });
});

var finder = function(email) {
  return db.users.find({email: email}, function(err, res){console.log(res)});
};

var insert = function(user) {
  db.users.insert({email: user.email, firstname: user.firstname, lastname: user.lastname, password: user.password}, 
    function(err, res){return res});
};

app.post('/signup', function(req, res) {
  console.log("User data from post:", req.body);
  if (finder(req.body.email) === undefined) {
    bcrypt.genSalt(10, function(err, salt) {
      if (err) { console.log(err); }
      bcrypt.hash(req.body.password, salt, function(err, hash) {
        if (err) { console.log(err); }
        req.body.password = hash;
        insert(req.body);
        console.log(req.body);
        var token = jwt.encode(req.body, secret);
        console.log("token from server: ", token);
        res.send(JSON.stringify(token));
      })
    })
  }
})

app.use(express.static(__dirname + '/../client'))

require('./config/middleware.js');

app.listen(3000);
console.log("listening on 3000");

module.exports = app;
