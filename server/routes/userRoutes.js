
var userController = require('./userController.js');

//from Yugen
module.exports = function (app) {
  // app.get('/favicon.ico', console.log("no favicon available"));	
  app.post('/login', userController.login);
  app.post('/signup', userController.signup);
  app.post('/index', userController.findBills);
};