angular.module('citizenfleet.home', [])
.controller('UserController', ['$scope', '$state', 'DataServices', function($scope, $state, DataServices) {

  $scope.bills;

  var getBills = function(query) {
  	//will only work with single word queries
    DataServices.fetchBills(query)
      .then(function(billsresult) {
        $scope.bills = billsresult;
      })
  }
}]);