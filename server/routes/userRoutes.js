
var userController = require('./userController.js');

//from Yugen
module.exports = function (app) {
  app.post('/login', userController.login);
  app.post('/signup', userController.signup);
  // app.post('/', userController.addUserLocation);
  // app.get('/', userController.getUserLocation);
};