var express = require('express');
var redis = require('redis');
var client = redis.createClient();
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var app = express();
var http = require('http');
var https = require('https');
var server = http.createServer(app);
// var Q = require('q');

require('./config/middleware.js')(app);

client.on('connect', function() {
  console.log('connected');
});

server.listen(3000);
console.log("listening on 3000");

module.exports = app;
