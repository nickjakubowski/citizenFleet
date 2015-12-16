var express = require('express');
var app = express();
var http = require('http');
var https = require('https');
var server = http.createServer(app);
var request = require('request');
// var bcrypt = require('bcrypt');
var Q = require('q');

// var helpers = require('./config/helpers');

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));
// app.post('/index', function(req, res) {
//   console.log("SFAPI was queried with: ",req.body.data);
//   var queryInfo = req.body.data;
//   var options = {
//     url: 'https://congress.api.sunlightfoundation.com/bills/search?query=' + queryInfo + '&active=true',
//     headers: {
//       'X-APIKEY': '6895f8ab90944228b8c8ea226ebdcfa1' 
//     }
//   }
//   request(options, function(err, response) {
//     if (err) { console.log("YO, THERE WAS AN ERROR!: ", err) }
//     res.status(200).send(response);
//   });
// });

// var finder = function(userEmail) {
// db.users.where("id=$1 OR id=$2", [10,21], function(err,products){
//   return products;//products 10 and 21
//   console.log('db query: ', products);
// });
// };

// var insert = function(user) {
//   db.users.insert({email: user.email, firstname: user.firstname, lastname: user.lastname, password: user.password}, 
//     function(err, res){});
// };

//fix finder function
// app.post('/signup', function(req, res) {
  // console.log("User data from post:", req.body);
  // if (finder(req.body.email) === undefined) {
  //   bcrypt.genSalt(10, function(err, salt) {
  //     if (err) { console.log(err); }
  //     bcrypt.hash(req.body.password, salt, function(err, hash) {
  //       if (err) { console.log(err); }
  //       req.body.password = hash;
  //       insert(req.body);
  //       console.log("after hashing: ", req.body);
  //       var token = jwt.encode(req.body, secret);
  //       console.log("token from server: ", token);
  //       res.status(200).send(JSON.stringify(token));
  //     })
  //   })
//   }
// });

// app.post('/login', function(req, res) {
//   console.log(req.body);
//    db.users.findOne({email: req.body.email}, function(err, user) {
//     bcrypt.compare(req.body.password, user.password, function(err, hash) {
//       console.log("password match: ", hash);
//       if (hash) {
//         var token = jwt.encode(req.body, secret);
//         res.status(200).send(JSON.stringify(token));
//       }
//     }) 
//   })   
// });

// app.use(express.static(__dirname + '/../client'))

require('./config/middleware.js')(app);

server.listen(3000);
console.log("listening on 3000");

module.exports = app;
