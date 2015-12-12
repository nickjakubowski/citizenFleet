angular.module('citizenfleet.signup', ['citizenfleet.services'])
  .controller('AuthController', ['$scope', '$state', '$window', 'DataService', function($scope, $state, $window, DataService) {
    
    $scope.user = {};
    
    $scope.signup = function(user) {
      console.log(user);
      $scope.user = null;
      DataService.signUp(user)
        .then(function(resp) {
          console.log("sent back: ", resp);
          $window.localStorage.setItem('isIt', resp);
          $state.go('index');
        })
        .catch(function(error) {
          console.log(error);
        })
    };

    $scope.loginUser = function(user) {
        DataService.login(user)
          .then(function(resp) {
            $state.go('index');
          })
    }
    

  }]);