
var userController = require('./userController.js');

module.exports = function (app) {
  app.get('/', userController.verify);
  app.post('/login', userController.login);
  app.post('/signup', userController.signup);
  app.post('/index', userController.findBills);
};