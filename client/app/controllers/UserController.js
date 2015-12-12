angular.module('citizenfleet.home', ['citizenfleet.services'])
.controller('UserController', ['$scope', '$state', 'DataService', function($scope, $state, DataService) {

  $scope.bills;

  $scope.getBills = function(query) {
    DataService.fetchBills(query)
      .then(function(billsresult) {
        $scope.bills = JSON.parse(billsresult).results;
        $scope.searchparams = null;
      })
  }
}]);