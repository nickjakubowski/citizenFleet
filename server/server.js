var express = require('express');
var app = express();
var http = require('http');
var https = require('https');
var server = http.createServer(app);
// var Q = require('q');

require('./config/middleware.js')(app);

server.listen(3000);
console.log("listening on 3000");

module.exports = app;
