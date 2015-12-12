angular.module('citizenfleet.services', [])
  .factory('DataService', function($http, $location) {

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

    var signUp = function(user) {
      return $http({
        method: 'POST',
        url: '/signup',
        data: JSON.stringify(user)
      })
      .then(function(resp) {
        console.log("This is from services: ", resp);
        return resp;
      }, function(err) {
        console.log(err);
      })
    };
    
    // var login = function(user) {
    //   return $http({
    //     method:'POST',
    //     url: '/index',
    //     data: JSON.stringify(user)
    //   })
    //   .then(function(resp) {
    //     console.log("From services: ", resp);
    //     return JSON.parse(resp);
    //   }, function(err) {
    //     console.log(err);
    //   })
    // };

    return {
      fetchBills: fetchBills,
      signUp: signUp
    };
  });