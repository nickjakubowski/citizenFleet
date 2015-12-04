var express = require('express');

var app = express();

app.use(express.static(__dirname + '/../client'))

app.get("/", function(req, res) {
  res.send('yup');
})

app.listen(3000);
console.log("listening on 3000");

module.export = app;
