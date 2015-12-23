var userController = require('./userController.js');

module.exports = function (app) {
  app.post('/index/add', userController.addBill);
};