var morgan = require('morgan'); // used for logging incoming request
var bodyParser = require('body-parser');
var helpers = require('./helpers.js'); // our custom middleware
var express = require('express');
var jwt = require('jsonwebtoken');
var secret = 'hackReactorThesisProjectJwtTokenSecret';
var session = require('express-session');
var RedisStore = require('connect-redis')(session);

module.exports = function (app) {
  // var userRouter = express.Router();
  // var locationRouter = express.Router();

  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(session({
    store: new RedisStore(),
    secret: 'codemonkey'
  }))
  app.use(express.static(__dirname + '/../../client'));

  // app.use('/users', userRouter);

  // app.use('/api/location', locationRouter); // user link router for link request
  // app.use(helpers.errorLogger);
  // app.use(helpers.errorHandler);

  require('../routes/userRoutes.js')(app);

  app.use(function(req, res, next) {
    console.log(req.headers);
    token = req.headers['x-access-token'];
    if (!token) {
      console.log("access denied");
      res.sendStatus(401);
    } else {
      jwt.verify(token, secret, function(err, decoded) {
        if (err) {
          console.log(err);
          res.sendStatus(403);        
        } else {
          console.log(decoded);
          next();
        }
      })
    }
  })
  // require('../routes/locationRoutes.js')(locationRouter);
  require('../routes/authRoutes.js')(app);
};  