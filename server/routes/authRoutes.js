var userController = require('./userController.js');

module.exports = function (app) {	
  app.post('/index/add', userController.addBill);
  app.get('/dash', userController.getBills);
  app.put('/dash/remove', userController.removeBill);
};