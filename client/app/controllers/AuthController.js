angular.module('citizenfleet.signup', ['citizenfleet.services'])
  .controller('AuthController', ['$scope', '$state', '$window', 'DataService', function($scope, $state, $window, DataService) {
    
    $scope.user = {};
    
    $scope.signup = function(user) {
      console.log(user);
      $scope.user = user.email;
      console.log($scope.user);
      DataService.signUp(user)
        .then(function(resp) {
          console.log("sent from services: ", resp);
          $window.localStorage.setItem('isIt', resp);
          $rootScope.user = resp.email;
          console.log($rootScope.user);
          $state.go('index');
        })
        .catch(function(error) {
          console.log(error);
        })
    };

    $scope.login = function(user) {
        DataService.loginUser(user)
          .then(function(resp) {
            console.log(resp);
            $window.localStorage.setItem('isIt', resp);
            $state.go('index');
          })
          .catch(function(error) {
            console.log(error);
          })
    }
    

  }]);