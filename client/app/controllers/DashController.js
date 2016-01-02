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
        $scope.userBills = bills;
        console.log("userBills from DashController:",$scope.userBills);
      })
    };

    $scope.remove = function() {
      var billId = this.bill.bill_id;
      DataService.removeBill(user, billId);
      $scope.userBills.splice(this.$index, 1); 
    };
    
    //this is also in user controller can be
    //refactored for DRY
    $scope.logout = function() {
      DataService.logout(); 
      $state.go('login');
    };

    $scope.loadBills();

  }]);