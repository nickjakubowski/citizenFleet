var morgan = require('morgan'); // used for logging incoming request
var bodyParser = require('body-parser');
var helpers = require('./helpers.js'); // our custom middleware
var express = require('express');

module.exports = function (app) {
  // var userRouter = express.Router();
  // var locationRouter = express.Router();

  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../client'));

  // app.use('/users', userRouter);

  // app.use('/api/location', locationRouter); // user link router for link request
  // app.use(helpers.errorLogger);
  // app.use(helpers.errorHandler);

  require('../routes/userRoutes.js')(app);
  // require('../routes/locationRoutes.js')(locationRouter);

};  