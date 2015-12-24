angular.module('citizenfleet.dash', ['citizenfleet.services'])
  .controller('DashController', ['$scope', '$state', '$window', '$rootScope', 'DataService', function($scope, $state, $window, $rootScope, DataService) {
    
    $scope.userBills;
    
    $scope.goToSearch = function() {
      $state.go('index');
    };

    $scope.loadBills = function() {
      user = $window.localStorage['isIt'];
      DataService.showTrackedBills(user);
    }
    
    //this is also in user controller can be
    //refactored for DRY
    $scope.logout = function() {
      DataService.logout(); 
      $state.go('login');
    };

    $scope.loadBills();

  }]);