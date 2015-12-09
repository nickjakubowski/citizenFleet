angular.module('citizenfleet.services', [])
  .factory('DataService', function($http, $location) {
    var fetchBills = function(query) {
      console.log("fetchBills was called with:", query);
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
        data: user
      })
      .then(function(resp) {
        return resp.data.body;
      }, function(err) {
        console.log(err);
      })
    } 
    return {
      fetchBills: fetchBills,
      signUp: signUp
    };
  });