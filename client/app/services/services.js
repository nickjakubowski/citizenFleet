angular.module('citizenfleet.services', [])
  .factory('DataService', function($http, $location, $window) {

    var signUp = function(user) {
      return $http({
        method: 'POST',
        url: '/signup',
        data: JSON.stringify(user)
      })
      .then(function(resp) {
        console.log("This is from services: ", resp);
        return JSON.parse(resp.data);
      }, function(err) {
        console.log(err);
      })
    };
    
    var loginUser = function(user) {
      return $http({
        method:'POST',
        url: '/login',
        data: JSON.stringify(user)
      })
      .then(function(resp) {
        console.log("From services: ", resp);
        return JSON.parse(resp.data);
      }, function(err) {
        console.log(err);
      })
    };

    //Sends the input parameters to the server in order to generate
    //a query request to the Sunlight Foundation API
    var fetchBills = function(query) {
      var obj = {data: query}
      return $http({
        method: 'POST',
        url: '/index',
        data: obj
      })
      .then(function (resp) {
        return resp.data.body;
      })
    };
    
    var logout = function() {
      $window.localStorage.removeItem('isIt');
      console.log($window.localStorage); 
    };

    var trackBill = function(bill) {
      //send bill object to server
      return $http({
        method: 'POST',
        url: '/index/add',
        data: JSON.stringify(bill);
      })
      .then(function(resp) {
        return resp.data.body;
      })
    };

    return {
      fetchBills: fetchBills,
      signUp: signUp,
      loginUser: loginUser,
      logout: logout
    };
  });