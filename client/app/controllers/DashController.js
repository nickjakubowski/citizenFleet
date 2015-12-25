angular.module('citizenfleet.dash', ['citizenfleet.services'])
  .controller('DashController', ['$scope', '$state', '$window', '$rootScope', 'DataService', function($scope, $state, $window, $rootScope, DataService) {
    
    $scope.userBills;
    var user = $window.localStorage['isIt'];
    
    $scope.goToSearch = function() {
      $state.go('index');
    };

    $scope.loadBills = function() {
      DataService.showTrackedBills(user)
      .then(function(bills) {
        console.log(bills);
        $scope.userBills = bills;
      })
    };

    $scope.remove = function() {
      
    };
    
    //this is also in user controller can be
    //refactored for DRY
    $scope.logout = function() {
      DataService.logout(); 
      $state.go('login');
    };

    $scope.loadBills();

  }]);