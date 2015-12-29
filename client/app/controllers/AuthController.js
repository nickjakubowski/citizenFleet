angular.module('citizenfleet.signup', ['citizenfleet.services'])
  .controller('AuthController', ['$scope', '$state', '$window', '$rootScope', 'DataService', function($scope, $state, $window, $rootScope, DataService) {
    
    $scope.user = {};

    $scope.verify = function() {
     access = $window.localStorage['isIt'];
     if ($state.current.name === 'login' && !access) {
      return;
     }else if (!access) {
       $state.go('login');
     }else {
      DataService.verify()
        .then(function(resp) {
          if (resp !== 200) {
            $state.go('login');
          } else {
            $state.go('dash');
          }
        })
      }
    };

    $scope.goToLogin = function() {
      $state.go('login');
    };

    $scope.goToSignup = function() {
      $state.go('signup');
    };
    
    $scope.signup = function(user) {
      $scope.user = user.email;
      console.log($scope.user);
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
    
    $scope.verify()

  }]);

