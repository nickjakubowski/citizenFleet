angular.module('citizenfleet.services', [])
  .factory('DataService', function($http, $location) {
    var fetchBills = function(query) {
      return $http({
        method: 'POST',
        url: '/index',
        data: query
      })
      .then(function (resp) {
        return resp.data;
      })
    }
  });