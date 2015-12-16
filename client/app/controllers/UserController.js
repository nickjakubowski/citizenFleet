angular.module('citizenfleet.home', ['citizenfleet.services'])
.controller('UserController', ['$scope', '$state', '$window', 'DataService', function($scope, $state, $window, DataService) {

  $scope.bills;
  $scope.userBills;

  $scope.getBills = function(query) {
    DataService.fetchBills(query)
      .then(function(billsresult) {
        $scope.bills = JSON.parse(billsresult).results;
        $scope.searchparams = null;
      })
  };

  $scope.logout = function() {
    $window.localStorage.removeItem('isIt');
    console.log($window.localStorage);
    $state.go('login');
  };

}]);