angular.module('citizenfleet.dash', ['citizenfleet.services'])
  .controller('DashController', ['$scope', '$state', '$window', '$rootScope', 'DataService', function($scope, $state, $window, $rootScope, DataService) {
    
    $scope.userBills = $rootScope.userBills;
    
    $scope.goToSearch = function() {
    $state.go('index');
    };
    
    //this is also in user controller can be
    //refactored for DRY
    $scope.logout = function() {
      DataService.logout(); 
      $state.go('login');
    };

  }]);