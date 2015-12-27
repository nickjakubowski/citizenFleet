
var userController = require('./userController.js');

//from Yugen
module.exports = function (app) {
  app.get('/', function(req, res) {
  	res.send('hello world')
  })
  app.post('/login', userController.login);
  app.post('/signup', userController.signup);
  app.post('/index', userController.findBills);
};