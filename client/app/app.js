angular.module('citizenfleet', ['ui.router','citizenfleet.home', 'citizenfleet.services'])

.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $httpProvider) {
  
  $urlRouterProvider.otherwise('/index');

  $stateProvider
    .state('index', {
      url: '/index',
      templateUrl: 'app/views/home.html',
      controller: 'UserController'
    })
}]);