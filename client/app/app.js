angular.module('citizenfleet', ['ui.router','citizenfleet.home','citizenfleet.services','citizenfleet.signup', 'citizenfleet.dash','ngMessages'])

.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $httpProvider) {
  
  $urlRouterProvider.otherwise('/signup');

  $stateProvider
    .state('signup', {
      url: '/signup',
      templateUrl: 'app/views/signup.html',
      controller: 'AuthController'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'app/views/login.html',
      controller: 'AuthController'
    })
    .state('index', {
      url: '/index',
      templateUrl: 'app/views/home.html',
      controller: 'UserController'
    })
    .state('dash', {
      url: '/dash',
      templateUrl: 'app/views/dash.html',
      controller: 'DashController'
    })
}]);