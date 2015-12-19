var bcrypt = require('bcrypt');
var jwt = require('jwt-simple');
var secret = 'hackReactorThesisProjectJwtTokenSecret';
var request = require('request');
var bodyParser = require('body-parser');
var massive = require('massive');
var connectionString = 'postgres://:@localhost/citizen'
var db = massive.connectSync({connectionString: connectionString});

var insert = function(user) {
  db.users.insert({email: user.email, firstname: user.firstname, lastname: user.lastname, password: user.password}, 
    function(err, res){});
  };

module.exports = {
  //requires string to send query to API
  findBills: function(req, res) {
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
  },

  addBill: function(req, res) {
    db.bills.findOne({bill_id: req.body.bill_id}, function(err, bill) {
      if (!bill) {
        db.bills.insert({bill_id: req.body.bill_id, sponsor: req.body.sponsor,
          title: req.body.official_title, introduced: req.body.introduced_on,
          score: req.body.search.score, active: req.body.active}, function(err, bill) {
            if (err) {console.log(err);}
            console.log(bill);
            res.status(201).send(JSON.stringify(bill));
          })
      }
    })
  },

  signup: function(req, res) {
   console.log("User data from post:", req.body);
    db.users.findOne({email: req.body.email}, function(err, user) {
    if (user) {
      console.log("You's exist -> go login!");
      res.sendStatus(418);
    } else { 
    bcrypt.genSalt(10, function(err, salt) {
      if (err) { console.log(err); }
      bcrypt.hash(req.body.password, salt, function(err, hash) {
        if (err) { console.log(err); }
        req.body.password = hash;
        insert(req.body);
        console.log(user == false);
        console.log("after hashing: ", req.body);
        var token = jwt.encode(req.body, secret);
        console.log("token from server: ", token);
        res.status(201).send(JSON.stringify(token));
      })
    })
    }
   })
  },

  login: function(req, res) {
    console.log(req.body);
    db.users.findOne({email: req.body.email}, function(err, user) {
    bcrypt.compare(req.body.password, user.password, function(err, hash) {
      console.log("password match: ", hash);
      if (hash) {
        var token = jwt.encode(req.body, secret);
        res.status(200).send(JSON.stringify(token));
      }
    }) 
  }) 
  }

}