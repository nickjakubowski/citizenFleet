angular.module('citizenfleet', ['ui.router','citizenfleet.home','citizenfleet.services','citizenfleet.signup', 'citizenfleet.dash','ngMessages'])

.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $httpProvider) {

  $stateProvider
    .state('signup', {
      url: '/signup',
      templateUrl: 'app/views/signup.html',
      controller: 'AuthController',
      access: {protected: false},
      logedIn: {blocked: true}
    })
    .state('login', {
      url: '/login',
      templateUrl: 'app/views/login.html',
      controller: 'AuthController',
      access: {protected: false},
      logedIn: {blocked: true}
    })
    .state('index', {
      url: '/index',
      templateUrl: 'app/views/home.html',
      controller: 'UserController',
      access: {protected: false},
      logedIn: {blocked: false}
    })
    .state('dash', {
      url: '/dash',
      templateUrl: 'app/views/dash.html',
      controller: 'DashController',
      access: {protected: true},
      logedIn: {blocked: false}
    })

    //sends user to login page by default and on get request to root
  $urlRouterProvider.otherwise('login');


}]);
