angular.module('citizenfleet.home', ['citizenfleet.services'])
.controller('UserController', ['$scope', '$state', '$window', '$rootScope', 'DataService', function($scope, $state, $window, $rootScope, DataService) {

  $scope.bills;
  $rootScope.userBills = [];
   
   $scope.verify = function() {
     access = $window.localStorage['isIt'];
     if (access === undefined) {
       $state.go('login');
     } else {
      DataService.verify()
        .then(function(resp) {
          if (resp !== 200) {
            $state.go('login');
          }
        })
      }
    };

  $scope.getBills = function(query) {
    DataService.fetchBills(query)
      .then(function(billsresult) {
        $scope.bills = JSON.parse(billsresult).results;
        console.log($scope.bills);
        $scope.searchparams = null;
      })
  };

  $scope.logout = function() {
    DataService.logout(); 
    $state.go('login');
  };

  $scope.add = function(elem) {
    access = $window.localStorage['isIt'];
    $('#' + this.$index).text('Tracking');
    DataService.trackBill(elem, access);
  };

  $scope.goToDash = function() {
    $state.go('dash');
  };
  
  // take out after .run and $stateChange Start refactor
  $state.current.name === 'index'? $scope.verify():console.log("You should login or sign up! It costs $0");

}]);