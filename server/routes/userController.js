var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var secret = 'hackReactorThesisProjectJwtTokenSecret';
var request = require('request');
var bodyParser = require('body-parser');
var massive = require('massive');
var connectionString = process.env.DATABASE_URL || ('postgres://:@localhost/citizen');
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
    url: 'https://congress.api.sunlightfoundation.com/bills/search?query="' + queryInfo + '"&fields=summary_short,sponsor,bill_id,official_title,introduced_on,score,urls,upcoming&active=true',
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
    var token = req.headers['x-access-token'];
    console.log('addBill request body:', req.body.sponsor);
    jwt.verify(token, secret, function(err, decoded) {
    if (err) {console.log("jwt error:", err)}
    db.users.findOne({email: decoded.email}, function(err, user) {
      console.log(user);
      db.bills.insert({bill_id: req.body.bill_id, sponsor: req.body.sponsor,
        title: req.body.official_title, introduced: req.body.introduced_on,
        summary_short: req.body.summary_short, active: req.body.active, full_bill_href: req.body.urls.congress}, function(err, bill) {
          if (err) {console.log(err);}
      });
      db.user_bills.insert({user_id: user.id, bill_id: req.body.bill_id}, function(err, bill) {
        if (err) {console.log(err)}
        res.status(201).send(JSON.stringify(bill));
      })
    })
  })
  },

  getBills: function(req, res) {
    var token = req.headers['x-access-token'];
    jwt.verify(token, secret, function(err, decoded) {
      db.users.findOne({email: decoded.email}, function(err, user) {
        db.run("select * from bills inner join user_bills on user_bills.bill_id = bills.bill_id where user_id = $1",[user.id], function(err, results) {
          if (err) {console.log(err);}
          res.status(200).send(JSON.stringify(results));
        })
      })
    })
  },

  removeBill: function(req, res) {
    console.log("removeBill console.log", req.body);
    var token = req.headers['x-access-token'];
    jwt.verify(token, secret, function(err, decoded) {
      db.users.findOne({email: decoded.email}, function(err, user) {
        db.user_bills.destroy({user_id: user.id, bill_id: req.body.billId}, function(err, results) {
          if (err) {console.log(err);}
          res.sendStatus(204);
        })
      })
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
        var token = jwt.sign(req.body, secret);
        res.status(201).send(JSON.stringify(token));
      })
    })
    }
   })
  },

  login: function(req, res) {
    console.log("req.body:",req.body);
    db.users.findOne({email: req.body.email}, function(err, user) {
    bcrypt.compare(req.body.password, user.password, function(err, hash) {
      if (hash) {
        var token = jwt.sign(req.body, secret);
        res.status(200).send(JSON.stringify(token));
      }
    }) 
  }) 
  }

}