angular.module('citizenfleet.home', ['citizenfleet.services'])
.controller('UserController', ['$scope', '$state', '$window', '$rootScope', 'DataService', function($scope, $state, $window, $rootScope, DataService) {

  $scope.bills;
  $scope.results;
  // $rootScope.userBills = [];

  $scope.getBills = function(query) {
    DataService.fetchBills(query)
      .then(function(billsresult) {
        $scope.bills = JSON.parse(billsresult).results;
        console.log($scope.bills);
        $scope.searchparams = null;
        $scope.results = query;
      })
  };

  $scope.logout = function() {
    DataService.logout(); 
    $state.go('login');
  };

  $scope.add = function(elem) {
    //refactor
    // console.log(elem);
    access = $window.localStorage['isIt'];
    $('#' + this.$index).text('Tracking');
    DataService.trackBill(elem, access);
  };

  $scope.goToDash = function() {
    $state.go('dash');
  };

  console.log(UserController);

}]);