angular.module('citizenfleet.services', [])
  .factory('DataService', function($http, $location, $window) {
     
    //remove this after .run and $routeChange refactor
    var verify = function() {
      return $http({
        method: 'GET',
        url: '/',
        headers: {'x-access-token': access}
      })
      .then(function(resp) {
        console.log("response in service:", resp.status);
        return JSON.parse(resp.status);
      })
    }

    var signUp = function(user) {
      return $http({
        method: 'POST',
        url: '/signup',
        data: JSON.stringify(user)
      })
      .then(function(resp) {
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
      console.log("should be localStorage:",$window.localStorage); 
    };

    var trackBill = function(bill, access) {
      //send bill object to server
      return $http({
        method: 'POST',
        url: '/index/add',
        headers: {'x-access-token': access},
        data: JSON.stringify(bill)
      })
      .then(function(resp) {
        return resp.data.body;
      })
    };

    var showTrackedBills = function(user) {
      return $http({
        method: 'GET',
        url: '/dash',
        headers: {'x-access-token': user},
      })
      .then(function(resp) {
        return resp.data;
      })
    };

    var removeBill = function(user, billId) {
      return $http({
        method: 'PUT',
        url: '/dash/remove',
        headers: {'x-access-token': user},
        data: JSON.stringify({billId: billId})
      })
    }

    return {
      verify: verify,
      fetchBills: fetchBills,
      trackBill: trackBill,
      showTrackedBills: showTrackedBills,
      removeBill: removeBill,
      signUp: signUp,
      loginUser: loginUser,
      logout: logout
    };
  });