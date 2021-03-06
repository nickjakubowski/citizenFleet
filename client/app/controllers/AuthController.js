angular.module('citizenfleet.signup', ['citizenfleet.services'])
  .controller('AuthController', ['$scope', '$state', '$window', '$rootScope', 'DataService', function($scope, $state, $window, $rootScope, DataService) {
    
    $scope.user = {};

    $scope.goToLogin = function() {
      $state.go('login');
    };

    $scope.goToSignup = function() {
      $state.go('signup');
    };
    
    $scope.signup = function(user) {
      $scope.user = user.email;
      DataService.signUp(user)
        .then(function(resp) {
          //cannot read prop 'status' of undefined
          //this works for now becuase it is broken
          if (resp.status !== 418) {
            console.log("sent from services: ", resp);
            $window.localStorage.setItem('isIt', resp);
            $state.go('index');
          }
        })
        .catch(function(error) {
          console.log(error);
        })
    };

    $scope.login = function(user) {
        DataService.loginUser(user)
          .then(function(resp) {
            $window.localStorage.setItem('isIt', resp);
            $state.go('index');
          })
          .catch(function(error) {
            console.log(error);
          })
    };
    

  }]);

