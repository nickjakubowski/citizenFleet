//alternative routing

// angular.module('citizenfleet')
// .run(runBlock);

// runBlock.$inject = ['$rootScope', '$state', '$window'];

// function runBlock($rootScope, $state, $window) {

//   var token = localStorage['isIt'];

//   if (!token) {
//   	$state.go('login');
//   }

//   $rootScope.$on('$stateChangeStart', 
//   function(evt, toState, toParams, fromState, fromParams) {
//   	if (!token && fromState !== 'login') {
//      $state.go('login');
//     }
//   })
// };



