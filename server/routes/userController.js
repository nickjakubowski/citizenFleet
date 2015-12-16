var bcrypt = require('bcrypt');
var jwt = require('jwt-simple');
var secret = 'hackReactorThesisProjectJwtTokenSecret';
var massive = require('massive');
var connectionString = 'postgres://:@localhost/citizen'
var db = massive.connectSync({connectionString: connectionString});

module.exports = {

  insert: function(user) {
  db.users.insert({email: user.email, firstname: user.firstname, lastname: user.lastname, password: user.password}, 
    function(err, res){});
  },
  
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

  signup: function(req, res) {
   console.log("User data from post:", req.body);
   //finder isn't going to work here - refactor
  // if (finder(req.body.email) === undefined) {
    bcrypt.genSalt(10, function(err, salt) {
      if (err) { console.log(err); }
      bcrypt.hash(req.body.password, salt, function(err, hash) {
        if (err) { console.log(err); }
        req.body.password = hash;
        insert(req.body);
        console.log("after hashing: ", req.body);
        var token = jwt.encode(req.body, secret);
        console.log("token from server: ", token);
        res.status(200).send(JSON.stringify(token));
      })
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