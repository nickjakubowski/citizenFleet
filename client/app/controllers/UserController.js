angular.module('citizenfleet.home', ['citizenfleet.services'])
.controller('UserController', ['$scope', '$state', 'DataService', function($scope, $state, DataService) {

  $scope.bills;

  $scope.getBills = function(query) {
  	console.log("getBills was called");
  	console.log(query);
  	//will only work with single word queries
    DataService.fetchBills(query)
      .then(function(billsresult) {
        $scope.bills = billsresult;
      })
  }
}]);