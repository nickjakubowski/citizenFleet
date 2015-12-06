var express = require('express');
var app = express();
var Massive = require('massive');
var db = Massive.connectSync({db: 'massive-test'});
var request = require('request');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.post('/index', function(req, res) {
  console.log(req.body.data);
  var queryInfo = req.body.data;
  var options = {
    url: 'https://congress.api.sunlightfoundation.com/bills/search?query=' + queryInfo + '&active=true',
    headers: {
      'X-APIKEY': 'random' 
    }
  }
  request(options, function(err, response) {
    if (err) { console.log("YO, THERE WAS AN ERROR!: ", err) }
    console.log(typeof response.body);
    res.send(response);
  });
});

app.use(express.static(__dirname + '/../client'))

// require('./config/middleware.js')(app, express);

app.listen(3000);
console.log("listening on 3000");

module.exports = app;