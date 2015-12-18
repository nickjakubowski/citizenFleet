
var userController = require('./userController.js');

//from Yugen
module.exports = function (app) {
  app.post('/login', userController.login);
  app.post('/signup', userController.signup);
  app.post('/index', userController.findBills);
  app.post('/index/add', userController.addBill);
};