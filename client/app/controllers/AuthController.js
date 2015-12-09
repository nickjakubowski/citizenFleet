angular.module('citizenfleet.signup', ['citizenfleet.services'])
  .controller('AuthController', ['$scope', '$state', 'DataService', function($scope, $state, DataService) {
    
    $scope.user = {};
    
    $scope.signup = function(user) {
      DataService.signUp(user)
        .then(function() {
          console.log('returned after promise');
        })
    };
    

  }]);